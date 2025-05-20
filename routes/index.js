const express = require("express");
const router = express.Router();
const util = require("util");
const ModelTweet = require("../models/tweets");
router.get("/", (req, res) => {
  console.log(router);

  res.render("index");
});
router.get("/tweet/new", (req, res) => {
  res.render("tweet");
});
router.post("/create/new/tweet", async (req, res) => {
  console.log(req.body);

  ModelTweet.insertOne({ ...req.body })
    .then((tweet) => {
      console.log(tweet);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error.errors.content.message);
      res.status(403).json({ error: error.errors.content.message });
    });
});
module.exports = router;
