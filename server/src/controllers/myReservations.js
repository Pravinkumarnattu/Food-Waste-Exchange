const Order = require("../models/Order");

const myReservations = async (req, res) => {
  try {
    const reservations = await Order.find({ ngoId: req.user.id })
      .populate("foodId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ reservations });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error occured while fetching reservations" });
  }
};

module.exports = myReservations;
