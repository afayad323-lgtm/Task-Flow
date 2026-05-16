const Task = require("../models/tasks.models");
const httpStatusText = require("../utlis/httpStatusText");
const asyncWrapper = require("../utlis/asyncWrapper");
const AppError = require("../utlis/AppError");

// CREATE TASK
const createTask = asyncWrapper(async (req, res) => {
  const { title, description } = req.body;

  const newTask = await Task.create({
    title,
    description,
    user: req.user.id,
  });

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "task added successfully",
    data: {
      task: newTask,
    },
  });
});

// GET ALL TASKS (Pagination + Search + Filter)
const getAllTasks = asyncWrapper(async (req, res) => {
  const { page = 1, limit = 10, search = "", completed } = req.query;

  const query = {
    user: req.user.id,
  };

  // search by title
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  // filter by completed
  if (completed !== undefined) {
    query.completed = completed === "true";
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query).skip(skip).limit(Number(limit));

  const totalTasks = await Task.countDocuments(query);

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      tasks,
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
    },
  });
});

// UPDATE TASK
const updateTasks = asyncWrapper(async (req, res, next) => {
  const { title, description, completed } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
    { title, description, completed },
    { new: true },
  );

  if (!updatedTask) {
    return next(new AppError("Task not found", 404));
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "task updated",
    data: { task: updatedTask },
  });
});

// DELETE TASK
const deleteTask = asyncWrapper(async (req, res, next) => {
  const deletedTask = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!deletedTask) {
    return next(new AppError("Task not found", 404));
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "task deleted",
    data: null,
  });
});

module.exports = {
  createTask,
  getAllTasks,
  updateTasks,
  deleteTask,
};
