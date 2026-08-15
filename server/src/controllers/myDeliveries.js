const Order = require("../models/Order");

const myDeliveries = async (req, res) => {
  try {
    const order = Order.find({ volunteerId: req.user.id })
      .populate({ path: "foodId", populate: { path: "donorId" } })
      .sort({ createdAt: -1 });
    return res.status(200).json(order);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = myDeliveries;
