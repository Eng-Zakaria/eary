const db = require("../db/dbConnection");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
class User {
  constructor(id, name, email, password, phone, status, role, token) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status || 0;
    this.role = role || "0";
    this.token = token;
  }
  static async getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, res) => {
        if (err) return reject(err);
        else {
          const users = res.map(
            (user) =>
              new User(
                user.id,
                user.name,
                user.email,
                user.password,
                user.phone,
                user.status,
                user.role,
                user.token
              )
          );
          return resolve(users);
        }
      });
    });
  }

  static async createUser(name, email, password, phone, status, role) {
    return new Promise((resolve, reject) => {
      const token = crypto.randomBytes(16).toString("hex");
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        else {
          db.query(
            `INSERT INTO users (name, email, password, phone, status, role, token) VALUES ("${name}", "${email}", "${hash}", "${phone}", "${status}", "${role}", "${token}")`,
            (err, res) => {
              if (err) return reject(err);
              else {
                const user = new User(
                  res.insertId,
                  name,
                  email,
                  hash,
                  phone,
                  status,
                  role,
                  token
                );
                return resolve(user);
              }
            }
          );
        }
      });
    });
  }
  static async getUserById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id = ?`;
      db.query(sql, [id], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (res.length === 0) {
          reject(new Error(`Users ${id} not found`));
        } else {
          const { id, name, email, password, phone, status, role, token } =
            res[0];
          resolve(
            new User(id, name, email, password, phone, status, role, token)
          );
        }
      });
    });
  }
  static async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE email = ?`;
      db.query(sql, [email], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (res.length === 0) {
          reject(new Error(`User ${email} not found`));
        } else {
          const { id, name, email, password, phone, status, role, token } =
            res[0];
          resolve(
            new User(id, name, email, password, phone, status, role, token)
          );
        }
      });
    });
  }
  update() {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET name = ?, email = ?, password = ?, phone = ?, status = ?, role = ?, token = ? WHERE id = ?`;
      db.query(sql, [this.name, this.email, this.password, this.phone, this.status, this.role, this.token, this.id], (err, res) => {
        if (err) {
          reject(err);
        } else if (res.affectedRows === 0) {
          reject(new Error(`User ${this.id} not found`));
        } else {
          resolve(this);
        }
      });
    });
  }
  
  delete() {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM users WHERE id = ?`;
      db.query(sql, [this.id], (err, res) => {
        if (err) return reject(err);
        else if (res.affectedRows === 0)
          return reject(new Error(`User ${this.id} not found`));
        else return resolve(this);
      });
    });
  }

  updateProfile(name, email, phone) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?`;
      db.query(sql, [name, email, phone, this.id], (err, res) => {
        if (err) return reject(err);
        else if (res.affectedRows === 0)
          return reject(new Error(`User ${this.id} not found`));
        else return resolve(this);
      });
    });
  }
  static async updateStatus(id, status) {
    try {
      const user = await User.getUserById(id);
      user.status = status;
      await user.update();
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
