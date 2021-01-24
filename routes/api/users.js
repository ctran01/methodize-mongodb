const express = require("express");
const mongoose = require("mongoose");
const getUserToken = require("../../utilities/getUserToken");
// const User = mongoose.model("User");
const User = require("../../models/User");
const requireAuth = require("../../middlewares/requireAuth");
const getAuthorization = require("../../middlewares/getAuthorization");

const router = express.Router();

router.get("/test", requireAuth, (req, res) => {
  res.send({ msg: "This is the user route" });
});

//get user information
router.get("/user/:userId", requireAuth, getAuthorization, async (req, res) => {
  const id = req.params.userId;
  const user = await User.findById(id).populate("teams");
  res.json(user);
});

router.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;
  // Check to see if anyone has already registered with email
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(400)
      .send({ email: "A user has already registered with that email" });
  }
  try {
    const newUser = new User({
      name: name,
      email: email,
      hashed_password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    //presave hashes and salts password
    await newUser.save();
    const token = getUserToken(newUser);

    res.send({ token, id: newUser._id, email: newUser.email });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = getUserToken(user);

    res.send({ id: user._id, token, email: user.email });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

router.put("/register/onboard", async (req, res) => {
  const { email, teamName } = req.body;

  const user = await User.findOne({ email: email });
  const token = getUserToken(user);
  res.status(200).send({ id: user._id, token, email: user.email });

  //create initial team
  const newTeam = await Team.create({
    name: teamName,
  });
  newTeam.Users.push(user);
  user.Teams.push(newTeam);
  await newTeam.save();
  await user.save();
});

module.exports = router;
