const express = require("express");
const userRouter = require("express").Router();
const userController = require("../controllers/usersController");
const admin = require("../middleware/admin");

userRouter.get("/", admin, userController.getAllUsers);
userRouter.post("/", admin, userController.createUser);
userRouter.get("/:id", userController.getUserById);
userRouter.get("/email/:email", admin, userController.getUserByEmail);
userRouter.put("/:id", admin, userController.updateUser);
userRouter.delete("/:id", admin, userController.deleteUser);
userRouter.put("/updateProfile/:id", userController.updateProfile);
userRouter.put("/updateStatus/:id", admin, userController.updateStatus);

module.exports = userRouter;
