const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bearerToken = require("express-bearer-token");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }
  const token = authorization.replace("Bearer ", "");
  // const { token } = req;
  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }
    const { id } = payload;
    const user = await User.findById(id);
    //if requireAuth is used, it inserts user into request as req.user
    //Here you can access req.user._id, req.user.email, req.user.name inside the request
    req.user = user;
    next();
  });
};

// const requireAuth = [bearerToken(),restoreUser]
// module.exports = {requireAuth}
