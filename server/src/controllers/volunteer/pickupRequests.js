const Order = require("../../models/Order");

const pickupRequests = async (req, res) => {
  try {
    const pickupRequest = await Order.find({ status: "reserved" })
      .populate({
        path: "foodId",
        populate: { path: "donorId" },
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(pickupRequest);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = pickupRequests;
