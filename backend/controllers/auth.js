const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const newUser = userModel({
      email,
      firstname,
      lastname,
      username,
      password,
    });

    const user = await newUser.save();
    if (user) {
      next();
    } else {
      res.status(500).json({
        message: "User not created",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      next();
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await userModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const match = await bcrypt.compare(password, user.password);
      const options = {
        expiresIn: "10000d",
      };
      if (match) {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          options
        );
        res.status(200).json({
          message: "Login Successful",
          token,
          userId: user._id,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { register, login };
