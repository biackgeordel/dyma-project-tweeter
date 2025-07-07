const ModelTweet = require("../models/tweets.model");

exports.createTweet = (data, author) => {
  console.log(author);
  return ModelTweet.insertOne({ ...data, ...author });
};
exports.getTweets = () => {
  return ModelTweet.find({}).populate("author");
};
exports.deleteTweet = (id) => {
  return ModelTweet.findOneAndDelete({ _id: id });
};
exports.getTweet = (id) => {
  return ModelTweet.findOne({ _id: id });
};
exports.modifierTweet = (id, content) => {
  console.log("modi :", content);
  return ModelTweet.findOneAndUpdate(
    { _id: id },
    { $set: { content } },
    { new: true, runValidators: true }
  );
};
exports.getTweetsUserandTweetsFollowing = (user) => {
  return ModelTweet.find({
    author: { $in: [user._id, user.following] },
  }).populate("author");
};
