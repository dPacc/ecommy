const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture, email },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log("UPDATE USER CONTROLLER", user);
  } else {
    const newUser = await new User({ name, picture, email }).save();
    console.log("CREATE USER CONTROLLER", newUser);
    res.json(newUser);
  }
};
