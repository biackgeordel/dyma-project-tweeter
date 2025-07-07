const { createUser, imageUpdate } = require("../queries/users.queries");
const User = require("../models/user.model");
const util = require("util");
const multer = require("../config/multer.config");
const { getTweets } = require("../queries/tweets.queries");

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect("/auth/signin/form");
  } catch (e) {
    console.log(util.inspect(e, { depth: 10, breakLength: 10, compact: 3 }));
    if (e.errors) {
      errors = Object.keys(e.errors).map((keys) => e.errors[keys].message);
    } else {
      errors = [e];
    }

    res.render("users/signup.pug", { errors, body });
  }
};
exports.signupForm = (req, res, next) => {
  res.render("users/signup.pug", { errors: null, body: {} });
};
exports.updateImage = [
  multer,
  async (req, res, next) => {
    try {
      const user = req.user;
      const [file] = req.files;
      const newUser = await imageUpdate(user, file);
      console.log(newUser);
      if (newUser) {
        res.redirect("/tweets");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];
exports.profilUserFollowing = async (req, res, next) => {
  try {
    const id = req.params.userId;
    console.log(req.user._id);
    const user = await User.findById(id);
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { following: [...user.following, req.user._id] } }
    );
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};
exports.deleteUserFollowing = async (req, res, next) => {
  const id = req.params.userId;
  const userId = req.user._id;
  const user = await User.findById(id);
  const tabFollower = user.following.filter(
    (id) => id.toString() !== userId.toString()
  );
  console.log(userId);
  console.log(tabFollower);
  await User.findOneAndUpdate(
    { _id: id },
    { $set: { following: tabFollower } }
  );
  res.redirect("/");
};
