const express = require("express");
const {
  newTweet,
  tweetList,
  createTweet,
  tweetDelete,
  editTweet,
  modifyTweet,
} = require("../controllers/tweets.controllers");
const router = express.Router();

router.get("/edit/:tweetId", editTweet);
router.get("/", tweetList);
router.post("/", createTweet);
router.post("/edit", modifyTweet);
router.delete("/:tweetId", tweetDelete);
router.get("/new", newTweet);

module.exports = router;
