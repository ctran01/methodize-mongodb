const express = require("express");
const mongoose = require("mongoose");
const getUserToken = require("../../utilities/getUserToken");
// const User = mongoose.model("User");
const User = require("../../models/User");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "This is the user route" });
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

module.exports = router;
