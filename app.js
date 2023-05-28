const express = require("express");
const path = require("path");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

const index = require("./routes");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "scripts")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);
app.listen(port, () => {
  console.log(`server listen port: ${port}`);
});
