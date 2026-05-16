const jwt = require("jsonwebtoken");
const httpStatusText = require("../utlis/httpStatusText");
const AppError = require("../utlis/AppError");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return next(new AppError("No token provided", 401));
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decodedToken;

    next();
  } catch (err) {
    return next(new AppError("Invalid Token", 401));
  }
};

module.exports = verifyToken;
