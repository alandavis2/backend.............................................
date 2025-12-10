const User = require("../models/User");
const Sam = require("../models/Sample")

// Register
exports.registerUser = async(req, res) => {
  const { name, email, password,Mobile } = req.body;

  const user = new User({ name, email, password,Mobile});
  await user.save();
  const sam = new Sam({ name, email });
  await sam.save();

  res.json({ message: "User Registered", user });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password,Mobile } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, message: "User not found" });
  if (user.password !== password || user.Mobile !== Mobile )
    return res.json({ success: false, message: "Wrong password" });

  res.json({ success: true, message: "Login Success", user });
};

// Get all
exports.getUsers = async (req, res) => {
  const users = await Sam.find();
  res.json(users);
};

// Delete
exports.deleteUser = async (req, res) => {
  await Sam.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
};