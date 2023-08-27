const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const { taskList, addTask, removeTask, completeTask } = require("./controller");
const app = express();
app.use(express.json()); //json=bodypaser
app.use(express.urlencoded({ extended: true }));
app.get("/getTaskList", taskList);
app.post("/addTask", addTask);
app.get("/removeTask", removeTask);
app.get("/completeTask", completeTask);
(async function () {
  try {
    const MONGODB_URL =
      process.env.MONGODB_URL || "mongodb://localhost:27020/task";
    await mongoose.connect(MONGODB_URL);
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
