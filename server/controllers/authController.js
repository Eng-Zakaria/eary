const authModel = require("../models/authModel");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await authModel.authenticateUser(email, password);
      const token = await authModel.createToken(user.id);
      res.status(200).json(`Logged in successfully, token: ${token}`);
    } catch (err) {
      res.status(400).json({ error: "Invalid credentials" });
    }
  }

  static async register(req, res) {
    const {
      name,
      email,
      password,
      phone,
      status = "active",
      role = "0",
    } = req.body;
    try {
      const user = await userModel.createUser(
        name,
        email,
        password,
        phone,
        status,
        role
      );
      res.status(200).json({ user, message: "Registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async logout(req, res) {
    const { token } = req.headers;
    try {
      await authModel.deleteToken(token);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
