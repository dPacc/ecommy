const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log("UPDATE USER CONTROLLER", user);
  } else {
    const newUser = await new User({
      name: email.split("@")[0],
      picture,
      email,
    }).save();
    console.log("CREATE USER CONTROLLER", newUser);
    res.json(newUser);
  }
};
