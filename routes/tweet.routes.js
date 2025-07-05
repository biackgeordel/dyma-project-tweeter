const express = require("express");
const {
  newTweet,
  tweetList,
  createTweet,
  tweetDelete,
  editTweet,
  modifyTweet,
  tweetsUserandTweetFollower,
} = require("../controllers/tweets.controllers");
const router = express.Router();

router.get("/edit/:tweetId", editTweet);
router.get("/", tweetsUserandTweetFollower);
router.post("/", createTweet);
router.post("/edit", modifyTweet);
router.delete("/:tweetId", tweetDelete);
router.get("/new", newTweet);

module.exports = router;
