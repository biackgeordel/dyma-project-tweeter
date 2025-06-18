const ModelTweet = require("../models/tweets.model");

exports.createTweet = (data) => {
  return ModelTweet.insertOne(data);
};
exports.getTweets = () => {
  return ModelTweet.find({});
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
