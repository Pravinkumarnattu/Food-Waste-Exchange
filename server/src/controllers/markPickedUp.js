const Order = require("../models/Order");

const markPickedUp = async (req, res) => {
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
    if (order.status !== "accepted") {
      return res
        .status(409)
        .json({ message: "Order is no longer available to pickup" });
    }
    order.status = "pickedup";
    order.pickupTime = new Date();
    await order.save();
    return res.status(200).json({ message: "Marked as picked up", order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = markPickedUp;
