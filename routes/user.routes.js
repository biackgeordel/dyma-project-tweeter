const {
  signup,
  signupForm,
  updateImage,
  profilUserFollowing,
  deleteUserFollowing,
} = require("../controllers/user.controllers");
const unsureAuthenticate = require("../controllers/gardes.controllers");

const router = require("express").Router();
router.post("/signup", signup);
router.post("/update/image", unsureAuthenticate, updateImage);
router.get("/follow/:userId", profilUserFollowing);
router.get("/unfollow/:userId", deleteUserFollowing);
router.get("/signup/form", signupForm);
router.get("/session/new", (req, res, next) => {
  res.render("users/connexion.pug", { errors: null, body: {} });
});
module.exports = router;
