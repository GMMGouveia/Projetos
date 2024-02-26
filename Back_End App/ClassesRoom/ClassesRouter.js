const express = require('express');
const classesRouter = express.Router();

const classesController = require('./ClassesController');
const CheckIsTeacher = require('../Middlewares/CheckIsTeacher');

classesRouter.post('/',CheckIsTeacher,classesController.createClass);
classesRouter.get('/',CheckIsTeacher,classesController.getAllClasses);

classesRouter.get('/:id',CheckIsTeacher,classesController.getClassesById);
classesRouter.put('/:id',CheckIsTeacher,classesController.updateClasses);
classesRouter.delete('/:id',CheckIsTeacher,classesController.deleteClasses);

module.exports = classesRouter;