const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userteamSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

mongoose.model("UserTeam", userteamSchema);
