const User = require("../models/User");

const profileController = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).select("-password");
    if (userDetails) return res.status(200).json(userDetails);
    else return res.status(404).json({ message: "No user found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = profileController;
