const taskSchema = require("../models/tasks.models");
const httpStatusText = require("../utlis/httpStatusText");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await taskSchema.create({
      title,
      description,
      user: req.user.id,
    });
    res.status(201).json({
      status: httpStatusText.SUCCESS,
      message: "task added successfully",
      data: {
        task: {
          id: newTask._id,
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
          user: newTask.user,
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: null, message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskSchema.find({ user: req.user.id });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { tasks } });
  } catch (err) {
    res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: null, message: err.message });
  }
};

const updateTasks = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTask = await taskSchema.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      { title, description, completed },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "task updated",
      data: { task: updatedTask },
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: null, message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskSchema.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTask) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "task deleted",
      data: null,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: null, message: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTasks,
  deleteTask,
};
