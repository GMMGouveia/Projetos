const mongoose = require('mongoose');
const teacherModel = require('./TeacherModel');
const classesModel = require('../ClassesRoom/ClassesModel');
 
exports.createTeacher = async function(req,res,next){
    var newTeacher = await teacherModel.create(req.body)
    .then((teacher)=>{
        res.status(201).json({
            status:'success',
            data:teacher
        })
    }).catch((err)=>{
        res.status(500).json({
            status:'fail',
            message: "error to create teacher" + err
        })
    })
}

exports.getAllTeachers = function(req,res,next){
    teacherModel.find().then((teacher)=>{
        res.status(200).json({
            status:'success',
            data:teacher
        })
    }).catch((err)=>{
        res.status(500).json({
            status:'fail',
            message: "error to get teachers" + err
        })
    })
}

exports.getTeacherById = function(req,res,next){
    let id = req.params.id;
    teacherModel.findById(id).then((teacher)=>{
        res.status(200).json({
            status:'success',
            data:teacher
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'teacher not found'
        })
    })
}

exports.updateTeacher = function(req,res,next){
    let id = req.params.id;
    teacherModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    .then((teacher)=>{
        res.status(200).json({
            status:'success',
            data:teacher
        })
    })
    .catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'teacher not found'
        })
    })
}

exports.deleteTeacher = function(req,res,next){
    let id = req.params.id;
    teacherModel.findByIdAndDelete(id).then((teacher)=>{
        res.status(200).json({
            status:'success',
            data:teacher
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'teacher not found'
        })
    })
}

exports.getTeacherWithoutClass = async function(req,res,next){
    var teachersInClass = [];
    let t = await classesModel.find({teachers:{ $exists: true }}).select('teachers').exec();
    t.forEach((element)=>{
        teachersInClass.push(...element.teachers);
    })

    var teachersInClass = teachersInClass.map((element)=>{return element._id.toString()});
    teacherModel.find({_id:{$nin:teachersInClass}})
    .then((teacher)=>{
        res.status(200).json({
            status:'success',
            data:teacher
        })
    }).catch((err)=>{
        res.status(400).json({
            status:'fail',
            message: "error to get teachers" + err
        })
    })
}