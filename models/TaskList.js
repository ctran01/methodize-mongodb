const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasklistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

mongoose.model("TaskList", tasklistSchema);