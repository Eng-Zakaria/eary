const express = require('express');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const UserRepository = require('../models/userRepository');
const AdminController = require('../controllers/AdminController');
const database = require('../db/databaseConfig');
const admin=require("../middleware/admin")
const adminRouter = express.Router();


const userRepository = new UserRepository(database); // create a new instance of the UserRepository, passing in the database instance
 //create a new instance of the UserController, passing in the UserRepository instance
const adminController = new AdminController(userRepository); //create a new instance of the AdminController, passing in the UserRepository instance

 // create a new instance of the AuthController, passing in the database instance



// Admin routes
adminRouter.post('/users',admin, adminController.createUser.bind(adminController)); // bind the createUser method to the adminController instance
adminRouter.put('/users/:id',admin, adminController.updateUser.bind(adminController)); // bind the updateUser method to the adminController instance
adminRouter.delete('/users/:id',admin, adminController.deleteUser.bind(adminController)); // bind the deleteUser method to the adminController instance
adminRouter.get('/users',admin, adminController.getAllUsers.bind(adminController)); // bind the getAllUsers method to the adminController instance
adminRouter.get('/users/:id',admin, adminController.getUserById.bind(adminController)); // bind the getUserById method to the adminController instance

module.exports = adminRouter;