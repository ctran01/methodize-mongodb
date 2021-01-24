const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    TaskLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskList" }],
    Tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },

  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
