const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
module.exports = (user) => {
  const userDataForToken = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(userDataForToken, secret);
  // { expiresIn: 3600 }
  return token;
};
