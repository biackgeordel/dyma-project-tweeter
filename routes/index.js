const express = require("express");
const router = express.Router();
const tweets = require("./tweet.routes");
const users = require("./user.routes");
const auth = require("./auth.routes");
const passport = require("passport");
const unsureAuthenticate = require("../controllers/gardes.controllers");

router.use("/tweets", unsureAuthenticate, tweets);
router.use("/users", users);
router.use("/auth", auth);

router.get("/", (req, res) => {
  res.redirect("/tweets");
});
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (error, user, info) => {
//     console.log("user: ", req);
//     if (error) next(error);
//     if (!user) {
//       body = req.body;
//       res.render("users/connexion.pug", {
//         errors: [info.message],
//         body,
//       });
//     } else {
//       req.logIn(user, (error) => {
//         if (error) next(error);
//         res.redirect("/");
//       });
//     }
//   })(req, res, next);
// });

module.exports = router;
