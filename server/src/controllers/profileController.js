const User = require("../models/User");

const profileController = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).select("-password");
    if (userDetails) res.status(200).json(userDetails);
    else res.status(404).json({ message: "No user found" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = profileController;
