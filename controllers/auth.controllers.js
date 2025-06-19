const passport = require("passport");
exports.signinForm = (req, res, next) => {
  res.end("fin");
  res.render("users/connexion.pug", { errors: null, body: {} });
};
exports.signin = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) next(error);
    if (!user) {
      const body = req.body;
      res.render("users/connexion.pug", { errors: [info.message], body });
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        console.log(res.getHeaders());
        res.redirect("/");
      });
    }
  })(req, res, next);
};
exports.signout = (req, res, next) => {
  req.logout((error) => {
    if (!error) {
      console.log("deconnecté");
      res.redirect("/");
    }
  });
};
