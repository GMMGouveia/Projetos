const express = require('express');
const studentRouter = express.Router();

const studentController = require('./StudentController');
const CheckIsTeacher = require('../Middlewares/CheckIsTeacher');

const CheckIsTeacherOrTutor = require('../Middlewares/ChecIsTeacherOrTutor')

studentRouter.post('/',CheckIsTeacherOrTutor,studentController.createStudent);
studentRouter.get('/get-all',CheckIsTeacher,studentController.getAllStudents);
studentRouter.get('/get-without-class',CheckIsTeacher,studentController.getStudentsWithOutClass);
studentRouter.get('/get-with-tutor/:id',CheckIsTeacherOrTutor,studentController.getStudentsWithTutor);

studentRouter.put('/:id',studentController.updateStudent);
studentRouter.get('/:id',CheckIsTeacherOrTutor,studentController.getStudentById);
studentRouter.delete('/:id',CheckIsTeacherOrTutor,studentController.deleteStudent);



module.exports = studentRouter;