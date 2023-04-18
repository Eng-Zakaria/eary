const User = require("../models/user");
class userController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async createUser(req, res) {
    try {
      const {
        name,
        email,
        password,
        phone,
        status = "active",
        role = "0",
      } = req.body;
      const user = await User.createUser(
        name,
        email,
        password,
        phone,
        status,
        role
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getUserById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.getUserByEmail(email);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, phone, status, role } = req.body;
    try {
      const user = await User.getUserById(id);
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.phone = phone || user.phone;
      user.status = status || user.status;
      user.role = role || user.role;
      await user.update();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getUserById(id);
      await user.delete();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async updateProfile(req, res) {
    const { id } = req.params;
    const { name, email, password, phone } = req.body;
    try {
      const user = await User.getUserById(id);
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.phone = phone || user.phone;
      await user.update();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = userController;
