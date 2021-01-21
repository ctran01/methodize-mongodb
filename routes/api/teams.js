const express = require("express");
const mongoose = require("mongoose");
const Team = mongoose.model("Team");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

router.get("/", async (req, res) => {
  const teams = await Team.find();
  if (teams) {
    res.json(teams);
    //res.send(teams)
  } else {
    return res.status(422).send({ error: "No teams" });
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(422).send({ error: "You must provide a name" });
  }

  const newTeam = new Team({
    name,
    description,
  });
  await newTeam.save();
  res.json(newTeam);
});

module.exports = router;
