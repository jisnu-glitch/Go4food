
const User = require('../models/User')
exports.getUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};