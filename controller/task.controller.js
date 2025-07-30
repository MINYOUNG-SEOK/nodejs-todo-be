const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const { userId } = req;
    const newTask = new Task({ task, isComplete, author: userId });
    await newTask.save();
    res.status(200).json({ status: "OK", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "FAIL", message: err.message });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).populate("author");
    res.status(200).json({ status: "OK", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "FAIL", message: err.message });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const { userId } = req;

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(404).json({
        status: "FAIL",
        message: "수정하려는 할일을 찾을 수 없습니다.",
      });
    }

    if (
      task &&
      task !== existingTask.task &&
      existingTask.author.toString() !== userId
    ) {
      return res.status(403).json({
        status: "FAIL",
        message: "다른 사람의 할일 내용은 수정할 수 없습니다.",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true }
    );

    res.status(200).json({
      status: "OK",
      message: "할일이 성공적으로 수정되었습니다.",
      data: updatedTask,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "FAIL", message: "수정 중 오류가 발생했습니다." });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        status: "FAIL",
        message: "삭제하려는 할일을 찾을 수 없습니다.",
      });
    }

    if (task.author.toString() !== userId) {
      return res.status(403).json({
        status: "FAIL",
        message: "다른 사람의 할일은 삭제할 수 없습니다.",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    res.status(200).json({
      status: "OK",
      message: "할일이 성공적으로 삭제되었습니다.",
      data: deletedTask,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "FAIL", message: "삭제 중 오류가 발생했습니다." });
  }
};

module.exports = taskController;
