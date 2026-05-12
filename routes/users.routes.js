const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});

module.exports = router;
