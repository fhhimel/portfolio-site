// // authController.js
//const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    // Validate request body
    // Hash password
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("User not found");
    }
    // Compare passwords
    // const passwordMatch = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );

    // Compare passwords directly
    if (req.body.password !== user.password) {
      throw new Error("Incorrect password");
    }
    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, "your_secret_key", {
    //   expiresIn: "1h",
    // });
    res.status(200).json({ status: true, message: "Login successful" });
  } catch (error) {
    res.status(401).json({ status: false, message: error.message });
  }
};
