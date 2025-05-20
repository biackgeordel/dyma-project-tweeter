const mongoose = require("mongoose");
const schema = mongoose.Schema;
schemaTweet = new schema(
  {
    content: {
      type: String,
      required: [true, "Veuillez saisir une message"],
      minLength: [6, "le tweet doit avoir au moins 6 caractères"],
      maxLength: [100, "le tweet doit avoir au max  100 caractères"],
    },
  },
  { timestamps: true }
);
const model = mongoose.model("tweets", schemaTweet);
module.exports = model;
