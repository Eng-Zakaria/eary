const express = require("express");
const authRouter = require("express").Router();

const authController = require("../controllers/authController");
const {
  validateLogin,
  validateRegister,
} = require("../validation/inputValidation");
authRouter.post("/login", validateLogin, authController.login);
authRouter.post("/register", validateRegister, authController.register);
authRouter.post("/logout", authController.logout);
module.exports = authRouter;
