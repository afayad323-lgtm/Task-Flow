const jwt = require("jsonwebtoken");
const httpStatusText = require("../utlis/httpStatusText");

const verifyToken = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const token = authHeaders.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({
      status: httpStatusText.FAIL,
      data: null,
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;
