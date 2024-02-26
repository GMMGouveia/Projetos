const mongoose = require('mongoose');
const studentModel = require('./StudentModel');
const classesModel = require('../ClassesRoom/ClassesModel');
const tutorModel = require('../Tutors/TutorModel');

exports.createStudent = async function(req,res,next){
    try{
    let student = req.body;
    student.tutor = req.userData.id;
    let newStudent = await studentModel.create(student)
    // newStudent.tutor = req.userData.id;
    res.status(201).json({
        status:'success',
        data:newStudent
    })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: "error to create student" + err
        })
    }
}

exports.getAllStudents = function(req,res,next){
    studentModel.find()
    .populate({
        path:"tutor",
        model: "Tutor"
    }).then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    }).catch((err)=>{
        res.status(400).json({
            status:'fail',
            message: "error to get students" + err
        })
    })
}

exports.getAllStudents2 = function(req,res,next){
    studentModel.find()
    .populate({
        path:"tutor",
        model: "Tutor"
    }).then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    }).catch((err)=>{
        res.status(400).json({
            status:'fail',
            message: "error to get students" + err
        })
    })
}

exports.getStudentById = function(req,res,next){
    let id = req.params.id;
    studentModel.findById(id)
    .populate({
        path:"tutor",
        model: "Tutor"
    })
    .then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'student not found' + err
        })
    })
}

exports.deleteStudent = function(req,res,next){
    let id = req.params.id;
    studentModel.findByIdAndDelete(id).then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'student not found'+ err
        })
    })
}

exports.getStudentsWithOutClass = async function(req,res,next){
    //IR buscar todos os ids de estudantes que estão em turmas
    var studentsInClass = [];
    var t = await classesModel.find({students:{$exists:true}}).select('students').exec();
    t.forEach((element)=>{
        studentsInClass.push(...element.students);
    })

    var studentsIds = studentsInClass.map((element)=>{return element._id.toString()});
    studentModel.find({_id:{$nin:studentsIds}})
    .then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    }).catch((err)=>{
        res.status(400).json({
            status:'fail',
            message: "error to get students" + err
        })
    })
}

exports.getStudentsWithTutor = async function(req,res,next){
    //IR buscar todos os ids de estudantes que tem tutor
    var students = await studentModel.find({tutor : req.params.id})
    .populate({
        path:"tutor",
        model: "Tutor"
    })
    .then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    }).catch((err)=>{
        res.status(400).json({
            status:'fail',
            message: "error to get students" + err
        })
    });
    
}

exports.updateStudent = function(req,res,next){
    let id = req.params.id;
    studentModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    .then((student)=>{
        res.status(200).json({
            status:'success',
            data:student
        })
    })
    .catch((err)=>{
        res.status(404).json({
            status:'fail',
            message: 'student not found' + err
        })
    })
}

