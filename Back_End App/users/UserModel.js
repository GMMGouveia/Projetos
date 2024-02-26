const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


let UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, 'escreva o seu email'],
        required: [true, 'escreva o seu email'],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'escreva a sua senha'],
        minlenght: [6, 'a senha deve ter no minimo 6 caracteres']
    },
    createdAt: Date,
    updatedAt: Date,
    permissions:{
        type: String,
        enum:['admin','teacher','tutor'],
        default: 'tutor'
    },
    passwordResetToken: String,
    passwordResetExpires: String,
    active:{
        type: Boolean,
        default: true
    }
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    var salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});


UserSchema.pre('/^find/', function(next){
    this.find({active:true});
    next();
})

UserSchema.methods = {
    authenticate: function(plainTextPword){
        console.log("this password is " + this.password);
        return bcrypt.compareSync(plainTextPword, this.password);
    },

    changePasswordAfter : function(JWTTimeStamp){
        if(this.changePasswordAt){
            let changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000);
            return JWTTimeStamp < changedTimeStamp;
        }
        return false;
    },

    createNewPasswordToken: function(){
        let str = "abcdefghijklmnopqrstuvwzyz1234567890";
        this.passwordResetToken = "";
        for (var i = 0; i<40; i ++){
            let n = Math.floor(Math.random()*(str.length - 1));
            this.passwordResetToken+=str[n];
        }
        this.passwordResetExpires = Date.now() + 30*60*1000;
        return this.passwordResetToken;
    },

    matchPassword:function(pass){
        if(bcrypt.compareSync(pass, this.password)){
            return true;
        }
        return false;
    },

    toJson: function(){
        var obj = this.ToObject();
        delete obj.password;
        return obj;
    }
};



module.exports = mongoose.model('User', UserSchema);