const { createUser, imageUpdate } = require("../queries/users.queries");
const User = require("../models/user.model");
const util = require("util");
const multer = require("../config/multer.config");

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
