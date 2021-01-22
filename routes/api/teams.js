const express = require("express");
const mongoose = require("mongoose");
// const Team = mongoose.model("Team");
const Team = require("../../models/Team");
const User = require("../../models/User");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

router.use(requireAuth);
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const team = await Team.findOne({ _id: id }).populate("users");

  if (team) {
    res.json(team);
    //res.send(teams)
  } else {
    return res.status(422).send({ error: "No teams" });
  }
});
//all users in a team
router.get("/:id/users", async (req, res, next) => {
  const team_id = req.params.id;
  const users = await Team.find({ id: team_id });
});

router.post("/user/:userId", async (req, res) => {
  const requestedUserId = req.params.userId; //string
  const authorizedUserId = req.user._id.toString(); //Int
  const { name, description } = req.body;
  //validation
  if (requestedUserId !== authorizedUserId) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  if (!name) {
    return res.status(422).send({ error: "You must provide a name" });
  }

  if (description) {
    try {
      const user = User.findById(authorizedUserId);
      const newTeam = new Team({
        name,
        description,
      });
      await newTeam.save();
      const team = Team.findById(newTeam._id);
      User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { teams: { _id: newTeam._id, description: description } } }
      );
      // res.json(newTeam);
      // res.send(newTeam)
    } catch (err) {
      return res.status(404).send({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
