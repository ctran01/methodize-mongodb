const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const User = mongoose.model("User");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "This is the user route" });
});

router.post("/register", async (req, res) => {
  const { name, email, hashed_password, image } = req.body;
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
      hashed_password: hashed_password,
    });
    //presave hashes and salts password
    await newUser.save();
    const userDataForToken = {
      id: newUser._id,
      email: newUser.email,
    };
    const token = jwt.sign({ userDataForToken }, secret);
    res.send({ token, id: newUser._id, email: newUser.email });
  } catch (err) {
    return res.status(422).send(err.message);
  }

  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.hashed_password, salt, async (err, hash) => {
  //     if (err) throw err;
  //     newUser.hashed_password = hash;
  //     try {
  //       await newUser.save();
  //       const token = jwt.sign({ userId: newUser._id }, secret);
  //       res.send({ token });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // });
});

router.post("/login", async (req, res) => {
  const { email, hashed_password } = req.body;

  if (!email || !hashed_password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(hashed_password);
    const userDataForToken = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ userDataForToken }, secret);
    res.send({ id: user._id, token, email: user.email });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
