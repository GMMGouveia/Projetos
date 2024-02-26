const mongoose = require('mongoose');
const classesModel = require('./ClassesModel');

exports.createClass = async function(req,res,next){
    try{
    let classes = req.body;
    let user = req.userData;
    let newClasses = await classesModel.create(classes)
    res.status(201).json({
        status:'success',
        data:newClasses
    })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: "error to create classes" + err
        })
    }
}

exports.getAllClasses = function(req,res,next){
    classesModel.find().then((classes)=>{
        res.status(200).json({
            status:'success',
            data:classes
        })
    }).catch((err)=>{
        res.status(400).json({
            status:'fail',
            message: "error to get classes" + err
        })
    })
}

exports.getClassesById = function(req,res,next){
    let id = req.params.id;
    classesModel.findById(id).then((classes)=>{
        res.status(200).json({
            status:'success',
            data:classes
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'classes not found' + err
        })
    })
}

exports.updateClasses = function(req,res,next){
    let id = req.params.id;
    classesModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    .then((classes)=>{
        res.status(200).json({
            status:'success',
            data:classes
        })
    })
    .catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'classes not found' + err
        })
    })
}

exports.deleteClasses = function(req,res,next){
    let id = req.params.id;
    classesModel.findByIdAndDelete(id).then((classes)=>{
        res.status(200).json({
            status:'success',
            data:classes
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'classes not found'+ err
        })
    })
}



    

