const express = require("express");
const router = express.Router();
const taskController = require("../controller/tasks.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, taskController.getAllTasks);
router.post("/", verifyToken, taskController.createTask);
router.put("/:id", verifyToken, taskController.updateTasks);
router.delete("/:id", verifyToken, taskController.deleteTask);

module.exports = router;
