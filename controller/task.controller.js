const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "OK", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "FAIL", message: err.message });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "OK", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "FAIL", message: err.message });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ status: "FAIL", message: "Task not found" });
    }
    res.status(200).json({ status: "OK", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "FAIL", message: err.message });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: "FAIL", message: "Task not found" });
    }
    res
      .status(200)
      .json({ status: "OK", message: "Task deleted", data: deletedTask });
  } catch (err) {
    res.status(400).json({ status: "FAIL", message: err.message });
  }
};

module.exports = taskController;
