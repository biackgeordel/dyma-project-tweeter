const { createUser, imageUpdate } = require("../queries/users.queries");
const User = require("../models/user.model");
const multer = require("../config/multer.config");

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect("/auth/signin/form");
  } catch (e) {
    errors = Object.keys(e.errors).map((keys) => e.errors[keys].message);
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
      const { id } = req.params;
      await imageUpdate(user, file);
      res.redirect("/tweets");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];
