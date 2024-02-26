const express = require('express');
const tutorRouter = express.Router();

const tutorController = require('./TutorController');

tutorRouter.post('/',tutorController.createTutor);
tutorRouter.get('/:id',tutorController.getTutorById);
tutorRouter.put('/:id',tutorController.updateTutor);
tutorRouter.delete('/:id',tutorController.deleteTutor);

module.exports = tutorRouter;