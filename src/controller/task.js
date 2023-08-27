const { Task } = require("../models");
const dayjs = require("dayjs");
const taskList = async (req, res) => {
  const { state } = req.query;
  let list = await Task.find();
  if (+state === 1 || +state === 2) {
    list = list.filter((el) => el.state === +state);
  }
  res.json({
    code: 0,
    success: true,
    list,
  });
};
const addTask = async (req, res) => {
  const { task, time } = req.body;
  let taskModel = new Task({
    task,
    time,
    complete: time,
    state: 1,
  });
  await taskModel.save();
  res.json({
    code: 0,
    success: true,
    data: taskModel,
  });
};
const removeTask = async (req, res) => {
  let { id } = req.query;
  let data = await Task.deleteOne({
    _id: id,
  });
  res.json({
    code: 0,
    success: true,
    data: data,
  });
};
const completeTask = async (req, res) => {
  let { id } = req.query;
  let data = await Task.updateOne(
    {
      _id: id,
    },
    { state: 2, complete: dayjs().format("YYYY-MM-DD HH:mm:ss") }
  );
  console.log(data);
  res.json({
    code: 0,
    success: true,
    data,
  });
};

module.exports = { taskList, addTask, removeTask, completeTask };
