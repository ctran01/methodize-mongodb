const express = require("express");
const mongoose = require("mongoose");
// const Team = mongoose.model("Team");
const Team = require("../../models/Team");
const User = require("../../models/User");
const requireAuth = require("../../middlewares/requireAuth");
const getAuthorization = require("../../middlewares/getAuthorization");
const router = express.Router();

router.use(requireAuth);
// router.use(getAuthorization);
//Get all users in a team

router.get("/:teamId", async (req, res) => {
  const id = req.params.teamId;
  const team = await Team.findOne({ _id: id }).populate("Users");

  if (team) {
    res.json(team);
    //res.send(teams)
  } else {
    return res.status(422).send({ error: "No teams" });
  }
});

//all users in a team
router.get("/:teamId/users", async (req, res, next) => {
  const team_id = req.params.teamId;
  const users = await Team.findById(team_id).populate("Users", "name");

  res.json(users);
});

//get all teams for a user
// router.get("/user/:userId", async(req,res,next)=>{
//   const userId = req.params.userId

//   const teams =  Team.find({})
// })

//create team
router.post("/user/:userId", getAuthorization, async (req, res) => {
  const requestedUserId = req.params.userId; //string
  const authorizedUserId = req.user._id; //Int
  const { name, description } = req.body;

  if (!name) {
    return res.status(422).send({ error: "You must provide a name" });
  }

  if (description) {
    try {
      const user = await User.findById(authorizedUserId);
      //Team.create has .save() included
      const newTeam = await Team.create({
        name,
        description,
      });
      // await newTeam.save();
      console.log(newTeam);
      // const team = await Team.findById(newTeam._id);
      user.Teams.push(newTeam);
      newTeam.Users.push(user);
      await newTeam.save();
      await user.save();

      res.json(newTeam);
    } catch (err) {
      return res.status(404).send({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
