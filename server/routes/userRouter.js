const express = require('express');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const UserRepository = require('../models/userRepository');
const AdminController = require('../controllers/AdminController');
const database = require('../db/databaseConfig');
 
const userRepository = new UserRepository(database);
const userController = new UserController(userRepository);
const userRouter = express.Router();
userRouter.get('/users', userController.getAllUsers.bind(userController)); // bind the getAllUsers method to the userController instance
userRouter.get('/users/:id', userController.getUserById.bind(userController));
module.exports = userRouter;