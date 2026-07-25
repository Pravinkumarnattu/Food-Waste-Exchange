const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
      enum: [
        "cooked_food",
        "bakery",
        "fruits_vegetables",
        "beverages",
        "others",
      ],
    },
    quantity: {
      type: String,
      required: true,
    },
    expiryTime: {
      type: Date,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "reserved", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
