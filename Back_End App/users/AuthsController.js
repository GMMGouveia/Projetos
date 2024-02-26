const mongoose = require('mongoose');
const userModel = require('./UserModel');
const tutorModel = require('../Tutors/TutorModel');
const teacherModel = require('../Teachers/TeacherModel');

let jwt = require('jsonwebtoken');
let config = require('../config');
const { promisify } = require('util');
const sendEmail = require('./email');



exports.signUp = async function(req,res,next){
    var newUser = new userModel(req.body);
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.save().then((user)=>{
        let token = jwt.sign({id:user._id},config.secrets.jwt,{expiresIn: config.expireTime});
        
        createUserRelatedEntity(user, req.body).then((data)=>{
            res.status(201).json({
                status:'success',
                token,
                user:user
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status:'fail',
                message: "error to create user" + err
            })
        }) 
    }).catch((err)=>{
        res.status(500).json({
            status:'fail',
            message: "error to create user" + err
        })
    })
};

async function createUserRelatedEntity(user, body){
    if(user.permissions == 'tutor'){
        var newTutor = {
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate,
            address: body.address,
            user: user._id
        }
        tutorModel.create(newTutor).then((tutor)=>{
            console.log(tutor);
        }).catch((err)=>{
            console.log(err);
        })
    }else if(user.permissions == 'teacher'){
        var newTeacher = {
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate,
            address: body.address,
            subject: body.subject,
            user: user._id
        }
        teacherModel.create(newTeacher).then((teacher)=>{
            console.log(teacher);
        }).catch((err)=>{
            console.log(err);
        })
    }
    
}

exports.login = function(req,res,next){
    let {email,password} = req.body;
    if(!email || !password){
        res.status(400).send(('you need email and password'))
        return;
    }   
    userModel.findOne({email:email}).then((user)=>{
        if (!user){
            res.status(401).send('No user with the given username');
            return;
        } else {
            if(!user||!user.authenticate(password)){
                res.status(401).send('wrong password');
                return;
            } else{
                console.log(user.permissions);
                let token = signToken(user._id,user.email,user.permissions);
                let returnUser = user;
                returnUser.password = undefined;
                res.status(200).json({
                    status:"success",
                    token: token,
                    permissions: user.permissions,
                    user: returnUser
                });
            }
        }
    })
}

let signToken = (id,email,permissions) =>{
    console.log(id);
    return jwt.sign({
        id:id,
        permissions:permissions,
        email:email
    
    },config.secrets.jwt,{
        expiresIn: config.expireTime
    })
}



exports.protectSytem = async function(req,res,next){
    let token = "";
    arrAuthorization = req.headers.authorization.split(" ");
    if(arrAuthorization[0] == 'Bearer' && arrAuthorization[1]){
        token = arrAuthorization[1];
        console.log(token);
        if(!token){
            res.status(401).json({
                status:'fail',
                message:'you need to be logged in'
            })
        }
    }

    let decoded = "";
    try{
        decoded = await promisify(jwt.verify)(token,config.secrets.jwt)
        console.log(decoded);
    } catch(err){
        console.log(err);
        res.status(401).json({
            status:'fail',
            message:'verification token expired please login again'
        })
        return;
    }

    let currentUser = await userModel.findById(decoded.id);
    console.log(currentUser);
    if(!currentUser){
        res.status(401).json({
            fail: 'user not exists'
        });
        return
    }

    if(currentUser.changedPasswordAfter(decoded.iat)){
        res.status(401).json({
            status:'fail',
            message:'user recently changed password please login again'
        })
        return;
    }

    req.user = currentUser;
    next();
};

exports.idAdmin = function(req,res,next){
    if(req.user &&req.user.permissions && req.user.permissions == 'admin'){
        next();
    } else{
        res.status(401).json({
            status:'fail',
            message:'you need to be admin'
        })
    }
}

exports.idTeacher = function(req,res,next){
    if(req.user &&req.user.permissions && req.user.permissions == 'teacher'){
        next();
    } else{
        res.status(401).json({
            status:'fail',
            message:'you need to be teacher'
        })
    }
}


exports.deleteUser = async function( req, res, next){
    let user = await user.findByIdAndUpdate(req.user._id, {active:false})
    res.status(204).json({
        status:"success",
        user: null
    });
}

exports.forgotPassword = async function(req, res, next){
    let user = await user.findOne({
        email:req.body.email
    })
    if(!user){
        res.status(404).json({
            message:"please send email"
        })
        return
    }

    try {
        let resetToken = user.createNewPasswordToken()
        await user.save({validateBeforeSave:false})
        let resetUrl = req.protocol + "://" + req.get('host') + "/api/users/resetPassword/" + resetToken;
        let message = "click here to make new password: " + resetUrl;
        await sendEmail ({
            email:user.email, 
            subject:'your password reset token',
            message
        })
        res.status(200).json({
            status:"success",
            message:"token sent to your email"
        })
    }
    catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false})
        res.status(500).json({
            status:"failed",
            message:"error sending email",
        })
    }
}

exports.resetPassword = async function(req, res, next){
    let user = await user.findOne({
        passwordResetToken:req.params.token,
        passwordResetExpires:{$gt:Date.now()}
    })
    if(!user){
        res.status(404).json({
            status:"failed",
            message:"invalid token"
        })
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    let token = signToken(user._id)
    res.status(200).json({
        status:"success",
        message: token
    });
}

exports.updatePassword = async function (req, res, next){
    let user = await user.findById(req.user._id);
    if(!(await user.matchPassword(req.body.currentPassword))){
        res.status(401).json({
            status:"failed",
            message:"password not correct"
        })
        return
    }
    user.password = req.body.password
    await user.save()
    let token = signToken(user._id);
    res.status(200).json({
        status:"success",
        token: token
    });
}

exports.updateMe = async function(req, res, next){
    if (req.body.password){
        res.status(400).json({
            status:"failed",
            message:"can't update password from here"
        });
        return
    }

    let filterBody = allowedObj(req.body, 'firstName', 'lastName', 'email');
    let user = await user.findByIdAndUpdate(req.user._id, filterBody, {new:true, runValidators:true})
    res.status(200).json({
        status:"success",
        user: user
    });
};

let allowedObj = function(obj,...allowedFields){
    let newObj = {};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el)){
            newObj[el] = obj[el]
        }
    });
    return newObj;
}

