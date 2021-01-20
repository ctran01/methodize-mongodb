const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
const app = express();

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    newCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send({ Message: "Sucessfully connected!" });
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
