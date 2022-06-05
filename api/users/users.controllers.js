const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXP } = require("../../secret/keys");
exports.signin = async (req, res) => {
  const payload = {
    id: req.user._id,
    name: req.user.username,
    exp: Date.now() + JWT_EXP,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  res.json({ token });

  // try {
  //   console.log("exports.signin -> req", req);
  // } catch (err) {
  //   res.status(500).json("Server Error");
  // }
};

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: req.newUser._id,
      name: req.newUser.username,
      exp: Date.now() + JWT_EXP,
    };
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
