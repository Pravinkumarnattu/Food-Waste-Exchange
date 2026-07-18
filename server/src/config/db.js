const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
  } catch (e) {
    console.error("Connection error: " + e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
