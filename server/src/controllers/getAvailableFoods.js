const Food = require("../models/Food");

const getAvailableFoods = async (req, res) => {
  try {
    const availableFoods = await Food.find({
      status: "active",
      expiryTime: { $gt: new Date() },
    }).sort({ createdAt: -1 });
    return res.status(200).json(availableFoods);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};
module.exports = getAvailableFoods;
