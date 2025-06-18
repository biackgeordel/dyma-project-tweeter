const express = require("express");
const path = require("path");
const morgan = require("morgan");

require("./data/connection");
const routing = require("./routes");
const errorHandler = require("errorhandler");
const app = express();
exports.app = app;

require("./config/session.config");
require("./config/passport.config");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routing);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler);
} else {
  app.use((error, req, res, next) => {
    const code = error.code || 500;
    res.json({
      code: code,
      message: code === 500 ? null : error.message,
    });
  });
}
module.exports = app;
