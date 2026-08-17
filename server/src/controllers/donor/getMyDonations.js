const Food = require("../../models/Food");

const getMyDonations = async (req, res) => {
  try {
    const foodDetails = await Food.find({ donorId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(foodDetails);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = getMyDonations;
