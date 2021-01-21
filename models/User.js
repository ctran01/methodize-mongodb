const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("hashed_password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.hashed_password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.hashed_password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  const user = this;
  return newPromise((resolve, reject) => {
    bcrypt.compare(password, user.hashed_password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
mongoose.model("User", userSchema);
