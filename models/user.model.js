const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserSchema = Schema(
  {
    image: {
      type: String,
      default: "https://randomuser.me/api/portraits/women/62.jpg",
    },
    username: {
      type: String,
      required: [true, "vous devez saisir un username"],
    },
    local: {
      password: {
        type: String,
        minLength: [3, "le mot de passe doit avoir au moins 3 caractères"],
      },
      email: {
        type: String,
        validate: {
          validator: async function (value) {
            if (!value) throw new Error("vous n'avez saisi aucun email");
            console.log("value :", value);
            const User = require("./user.model.js");
            const email = await User.findOne({ "local.email": value });
            if (email) {
              throw new Error("l'email doit etre unique");
            } else {
              return /[a-z0-9\.-]+@[a-z0-9\.-]{2,}\.[a-z]{2,}/.test(value);
            }
          },
          message: "l'email saisi n'est pas au bon format",
        },
      },
      googleId: { type: String },
    },
  },
  { timestamps: true }
);
UserSchema.statics.hassPassword = async (password) => {
  if (password !== "" && password.length >= 3) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } else {
    return new Promise((resolve, reject) => resolve(password));
  }
};
UserSchema.methods.comparePassword = function async(password) {
  if (this.local.password) {
    return bcrypt.compare(password, this.local.password);
  } else {
    return new Promise((resolve, reject) => resolve(false));
  }
};

const ModelUser = mongoose.model("user", UserSchema);
module.exports = ModelUser;
