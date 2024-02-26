const express = require('express');
const userRouter = express.Router();
const userController = require('./UserController');
const authController = require('./AuthsController');


//routers dos users 

userRouter.post('/signup',authController.signUp);
userRouter.post('/login',authController.login);
userRouter.put('/delete',authController.protectSytem,userController.deleteUser);
userRouter.put('/update',authController.protectSytem,userController.updateUser);


userRouter.post('/',userController.createUser);
userRouter.get('/:id',userController.getUserById);
userRouter.put('/:id',userController.updateUser);
userRouter.delete('/:id',userController.deleteUser);


module.exports = userRouter;