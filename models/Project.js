const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = {
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
};

mongoose.model("Project", projectSchema);
