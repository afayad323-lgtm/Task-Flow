const bcrypt = require("bcrypt");
const httpStatusText = require("../utlis/httpStatusText");
const userSchema = require("../models/users.models");
const generateToken = require("../utlis/generateToken");

const asyncWrapper = require("../utlis/asyncWrapper");
const AppError = require("../utlis/AppError");

// REGISTER
exports.register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existUser = await userSchema.findOne({ email });

  if (existUser) {
    return next(new AppError("User already exists", 400));
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
});

// LOGIN
exports.login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    return next(new AppError("Invalid email or password", 401));
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
      token,
    },
  });
});
