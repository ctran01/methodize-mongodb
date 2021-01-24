const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasklistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    Tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const TaskList = mongoose.model("TaskList", tasklistSchema);

module.exports = TaskList;
