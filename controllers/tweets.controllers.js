const {
  createTweet,
  getTweets,
  getTweet,
  deleteTweet,
  modifierTweet,
  getTweetsUserandTweetsFollowing,
} = require("../queries/tweets.queries");
exports.tweetList = async (req, res, next) => {
  const user = req.user;
  try {
    const tweets = await getTweets();
    if (tweets) {
      res.render("tweets/tweet-list", {
        tweets,
        user,
        isAuthenticated: req.isAuthenticated(),
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.newTweet = (req, res, next) => {
  try {
    const user = req.user;
    res.render("tweets/tweet-form", { content: {}, user, errors: [] });
  } catch (error) {
    next(error);
  }
};
exports.createTweet = async (req, res, next) => {
  const user = req.user;
  try {
    const tweet = await createTweet(req.body, { author: req.user._id });
    if (tweet) {
      res.redirect("/tweets");
    }
  } catch (error) {
    console.log(error);
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    console.log("errors :", errors);
    res
      .status(400)
      .render("tweets/tweet-form", { errors, content: req.body, user });
  }
};
exports.tweetDelete = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.tweetId;
    const tweetDelete = await deleteTweet(id);
    if (tweetDelete) {
      const tweets = await getTweetsUserandTweetsFollowing(user);
      if (tweets) {
        res.render("partiels/partiel.tweetList.pug", {
          tweets,
          user,
          isAuthenticated: req.isAuthenticated(),
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.editTweet = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.tweetId;
    const tweet = await getTweet(id);
    const content = tweet;
    res.render("tweets/tweet-form", { content, user, errors: [] });
  } catch (error) {
    next(error);
  }
};
exports.modifyTweet = async (req, res, next) => {
  const user = req.user;
  try {
    const id = req.query.id;
    console.log(id);
    const content = req.body.content;
    console.log(content);
    const tweet = await modifierTweet(id, content);
    console.log(tweet);
    res.redirect("/tweets");
  } catch (error) {
    console.log("body :", req.body);
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    console.log("errors :", errors);
    res.status(400).render("tweets/tweet-form", {
      errors,
      content: { _id: req.query.id, ...req.body },
      user,
    });
  }
};
exports.tweetsUserandTweetFollower = async (req, res, next) => {
  const user = req.user;
  try {
    const tweets = await getTweetsUserandTweetsFollowing(user);
    if (tweets) {
      console.log("tweets :", tweets);
      res.render("tweets/tweet-list", {
        tweets,
        user,
        isAuthenticated: req.isAuthenticated(),
      });
    }
  } catch (e) {
    next(e);
  }
};
