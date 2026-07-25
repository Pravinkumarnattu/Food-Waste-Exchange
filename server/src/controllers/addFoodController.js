const Food = require("../models/Food");

const addFoodController = async (req, res) => {
  const { foodName, foodType, quantity, dateTime, pickupAddress } = req.body;

  const foodDetails = {
    foodName,
    foodType,
    quantity,
    expiryTime: dateTime,
    pickupAddress,
    donorId: req.user.id,
  };
  try {
    const response = await Food.create(foodDetails);
    return res.status(201).json({ message: "Food Added" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = addFoodController;
