const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user
  });
  res.json(task);
};

// Get Tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
};

// Update Task
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

// Delete Task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};