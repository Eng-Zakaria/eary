// const user = require("../models/user");
const authModel = require("../models/authModel");

const admin = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const user = await authModel.getUserByToken(token);
    console.log(user);
    req.userId = user.id;
    if (user.role === 1) {
      next();
    } else {
      res.status(401).json({ err: "Unauthorized access" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Unauthorized access" });
  }
};

module.exports = admin;
