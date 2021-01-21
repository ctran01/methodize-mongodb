require("./models/User");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;
const users = require("./routes/api/users");
const requireAuth = require("./middlewares/requireAuth");
const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(users);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

app.get("/", requireAuth, (req, res) => {
  console.log(res);
  res.send({ Message: "Sucessfully connected!" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
