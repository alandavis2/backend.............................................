const User = require("../models/User");
const Sam = require("../models/Sample");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, Mobile } = req.body;

    const user = new User({ name, email, password, Mobile });
    await user.save();
    const sam = new Sam({ name, email });
    await sam.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ message: "User Registered", user: userObj });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password, Mobile } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (user.password !== password || user.Mobile !== Mobile)
      return res
        .status(401)
        .json({ success: false, message: "Wrong credentials" });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ success: true, message: "Login Success", user: userObj });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all
exports.getUsers = async (req, res) => {
  try {
    const users = await Sam.find();
    res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    await Sam.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
