const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const requestedUserId = req.params.userId; //string
  const authorizedUserId = req.user._id; //Int
  const user = User.findById(authorizedUserId);

  if (requestedUserId !== authorizedUserId.toString()) {
    return res.status(401).send({ error: "Unauthorized" });
  } else {
    return next();
  }
};
