const express = require("express");
const userRouter = require("express").Router();
const userController = require("../controllers/usersController");
const admin = require("../middleware/admin");

userRouter.get("/", admin, userController.getAllUsers);
userRouter.post("/", admin, userController.createUser);
userRouter.get("/:id", admin, userController.getUserById);
userRouter.get("/email/:email", admin, userController.getUserByEmail);
userRouter.put("/:id", admin, userController.updateUser);
userRouter.delete("/:id", admin, userController.deleteUser);
userRouter.put("/updateProfile/:id", userController.updateProfile);

module.exports = userRouter;
