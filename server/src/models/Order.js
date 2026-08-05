const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["reserved", "picked_up", "delivered"],
      default: "reserved",
    },
    pickupTime: {
      type: Date,
    },
    deliveryTime: {
      type: Date,
    }
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
