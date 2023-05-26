const express = require("express");
const path = require("path");
process.env.PORT = 4000;
const port = process.env.port || 3000;

const user = require("./scripts/user");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "scripts")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", user);
app.listen(port, () => {
  console.log(process.env);
  console.log("server listen port 8080");
});
