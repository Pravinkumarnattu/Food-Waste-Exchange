const User = require("../models/User");

const donorAddress = async (req, res) => {
  try {
    const donorData = await User.findById(req.user.id);
    if (donorData)
      return res.status(200).json({ address: donorData.donor.donorAddress });
    else return res.status(404).json({ message: "Not found" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = donorAddress;
