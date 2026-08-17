const Order = require("../../models/Order");

const myDeliveries = async (req, res) => {
  try {
    const orders = await Order.find({ volunteerId: req.user.id })
      .populate({ path: "foodId", populate: { path: "donorId" } })
      .populate("ngoId")
      .sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = myDeliveries;
