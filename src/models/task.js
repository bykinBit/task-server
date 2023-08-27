const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const TaskSchema = new Schema(
  {
    task: String,
    time: String,
    complete: String,
    state: Number,
  },
  {
    toJSON: {
      transform: function (_doc, result) {
        result.id = result._id;
        delete result._id;
        delete result.__v;
        return result;
      },
    },
  }
);
const Task = model("task", TaskSchema);
module.exports = Task;
