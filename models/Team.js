const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
