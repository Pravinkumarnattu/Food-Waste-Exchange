const Order = require("../models/Order");
const Food = require("../models/Food");

const markDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.volunteerId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to do this" });
    }
    if (order.status !== "pickedup") {
      return res
        .status(409)
        .json({ message: "Order is no longer available to deliver" });
    }
    order.status = "delivered";
    order.deliveryTime = new Date();
    await order.save();
    await Food.findByIdAndUpdate(order.foodId, { status: "completed" });
    return res.status(200).json({ message: "Marked as delivered", order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = markDelivered;
