const passport = require("passport");
const User = require("../models/user.model");
const LocalStrategy = require("passport-local").Strategy;
const { app } = require("../app");
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(null, false, { message: "user not found" });
  }
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ "local.email": email });
        if (user) {
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "the password does not " });
          }
        } else {
          done(null, false, {
            message: "user not found",
          });
        }
      } catch (e) {
        done(null, false, { message: "user impossible" });
      }
    }
  )
);
