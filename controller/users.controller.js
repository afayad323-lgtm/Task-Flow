const bcrypt = require("bcrypt");
const httpStatusText = require("../utlis/httpStatusText");
const userSchema = require("../models/users.models");
const generateToken = require("../utlis/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userSchema.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: httpStatusText.SUCCESS,
      message: "User created successfully",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: null, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: httpStatusText.FAIL,
        message: "Invalid email or password",
      });
    }
    let comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(401).json({
        status: httpStatusText.FAIL,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "login success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: null, message: err.message });
  }
};
