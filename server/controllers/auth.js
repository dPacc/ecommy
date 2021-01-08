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

exports.currentUser = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email }).exec();

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.currentAdmin = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email }).exec();

  if (user.role === "admin") {
    res.json({
      data: {
        products: ["car", "laptop", "mobile"],
      },
    });
  } else {
    res.status(401).json({
      error: "You are trying to access admin resource. Access Denied",
    });
  }
};
