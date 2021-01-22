const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tasklist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskList",
  },
  assignee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  completed_at: {
    type: Date,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

mongoose.model("Task", taskSchema);
