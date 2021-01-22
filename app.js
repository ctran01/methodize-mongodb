// require("./models/User");
// require("./models/Team");
// require("./models/Project");
// require("./models/TaskList");
// require("./models/Task");
// require("./models/Comment");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoURI = process.env.mongoURI;
const users = require("./routes/api/users");
const teams = require("./routes/api/teams");
const projects = require("./routes/api/projects");
const requireAuth = require("./middlewares/requireAuth");
const Team = require("./models/Team");
const port = process.env.PORT || 8080;

const app = express();

const whitelist = [
  "http://localhost:3000", //Development
  "https://methodize-app.herokuapp.com", // Heroku
  "http://www.methodize-app.com", //AWS domain
  "http://ec2-34-211-227-91.us-west-2.compute.amazonaws.com", //AWS EC2
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(users);
app.use("/teams", teams);

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
