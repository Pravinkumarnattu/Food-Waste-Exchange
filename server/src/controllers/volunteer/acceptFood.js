const Order = require("../../models/Order");

const acceptFood = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.status !== "reserved") {
      return res.status(409).json({ message: "Order is no longer available to accept" });
    }
    order.status = "accepted";
    order.volunteerId = req.user.id;
    await order.save();
    return res
      .status(201)
      .json({ message: "Accepted order successfully", order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while accepting order" });
  }
};

module.exports = acceptFood;
