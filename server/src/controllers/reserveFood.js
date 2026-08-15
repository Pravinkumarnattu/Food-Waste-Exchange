const Food = require("../models/Food");
const Order = require("../models/Order");

const reserveFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { id } = req.user;
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    if (food.status !== "active") {
      return res.status(409).json({ message: "Food is already reserved" });
    }
    const order = {
      foodId,
      ngoId: id,
    };
    const newOrder = await Order.create(order);
    food.status = "reserved";
    await food.save();
    return res
      .status(201)
      .json({ message: "Food reserved successfully", order: newOrder });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while reserving food" });
  }
};

module.exports = reserveFood;
