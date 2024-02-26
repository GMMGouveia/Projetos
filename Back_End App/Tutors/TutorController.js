const mongoose = require('mongoose');
var tutorModel = require('./TutorModel');

exports.createTutor = async function(req,res,next){
    var newTutor = await tutorModel.create(req.body)
    .then((tutor)=>{
        res.status(201).json({
            status:'success',
            data:tutor
        })
    }).catch((err)=>{
        res.status(500).json({
            status:'fail',
            message: "error to create tutor" + err
        })
    })
};

exports.getAllTutors = function(req,res,next){
    tutorModel.find().then((tutor)=>{
        res.status(200).json({
            status:'success',
            data:tutor
        })
    }).catch((err)=>{
        res.status(500).json({
            status:'fail',
            message: "error to get tutors" + err
        })
    })
};

exports.getTutorById = function(req,res,next){
    let id = req.params.id;
    tutorModel.findById(id).then((tutor)=>{
        res.status(200).json({
            status:'success',
            data:tutor
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'tutor not found'
        })
    })
};

exports.updateTutor = function(req,res,next){
    let id = req.params.id;
    tutorModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    .then((tutor)=>{
        res.status(200).json({
            status:'success',
            data:tutor
        })
    })
    .catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'tutor not found'
        })
    })
}

exports.deleteTutor = function(req,res,next){
    let id = req.params.id;
    tutorModel.findByIdAndDelete(id).then((tutor)=>{
        res.status(200).json({
            status:'success',
            data:tutor
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'tutor not found'
        })
    })
}

