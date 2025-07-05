const mongoose = require("mongoose");
const schema = mongoose.Schema;
schemaTweet = new schema(
  {
    content: {
      type: String,
      required: [true, "Veuillez saisir une message"],
      minLength: [6, "le tweet doit avoir au moins 6 caractères"],
      maxLength: [300, "le tweet doit avoir au max  300 caractères"],
    },
    author: { type: schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);
const model = mongoose.model("tweets", schemaTweet);
module.exports = model;
