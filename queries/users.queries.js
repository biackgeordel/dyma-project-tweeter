const User = require("../models/user.model");
exports.createUser = async (body) => {
  try {
    const hassedPassword = await User.hassPassword(body.password);
    const user = new User({
      username: body.username,
      local: {
        email: body.email,
        password: hassedPassword,
      },
    });
    return user.save({ runValidator: true });
  } catch (e) {
    throw e;
  }
};
exports.imageUpdate = async (user, file) => {
  const image = "/images/" + file.filename;
  return User.findOneAndUpdate({ _id: user._id }, { $set: { image } });
};
