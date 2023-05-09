const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/userClass");
class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(req, res) {
    const saltRounds = 10;
    const plaintextPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);

    const token = crypto.randomBytes(16).toString("hex");

    const user = new User(null, req.body.name, req.body.email, hashedPassword, req.body.phone, req.body.status, req.body.role, token);
    const result = await this.userRepository.createUser(user);
    res.status(201).json(result);
  }

  async updateUser(req, res) {
    const user = new User(req.params.id, req.body.name, req.body.email, req.body.password , req.body.phone, req.body.status, req.body.role, req.body.token);
    const result = await this.userRepository.updateUser(user);
    res.status(200).json(result);
  }

  async deleteUser(req, res) {
    const user = await this.userRepository.getUserById(req.params.id);
  
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
  
    await this.userRepository.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  }

  async getUserById(req, res) {
    const result = await this.userRepository.getUserById(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send({ message: "User not found"});
    }
  }

  async getAllUsers(req, res) {
    const result = await this.userRepository.getAllUsers();
    res.status(200).json(result);
  }
}
module.exports = UserController;