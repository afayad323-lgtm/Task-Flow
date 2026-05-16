const express = require("express");
const router = express.Router();
const taskController = require("../controller/tasks.controller");
const verifyToken = require("../middleware/verifyToken");

// apply middleware to all routes below
router.use(verifyToken);

// TASK ROUTES
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTasks);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
