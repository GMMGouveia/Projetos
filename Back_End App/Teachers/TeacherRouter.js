const express = require('express');
const teacherRouter = express.Router();

const teacherController = require('./TeacherController');

teacherRouter.post('/',teacherController.createTeacher);
teacherRouter.get('/get-teacherWithOutClass',teacherController.getTeacherWithoutClass);
teacherRouter.get('/',teacherController.getAllTeachers);

teacherRouter.get('/:id',teacherController.getTeacherById);
teacherRouter.put('/:id',teacherController.updateTeacher);
teacherRouter.delete('/:id',teacherController.deleteTeacher);

module.exports = teacherRouter;