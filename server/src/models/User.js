const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new mongoose.Schema({
  businessName: String,
  businessType: String,
  donorAddress: String,
});

const ngoSchema = new mongoose.Schema({
  organizationName: String,
  ngoRegistrationNumber: String,
  organizationAddress: String,
  areaOfOperation: String,
  verified: {
    type: Boolean,
    default: false,
  },
});

const volunteerSchema = new mongoose.Schema({
  fullName: String,
  volunteerAddress: String,
  modeOfTransport: String,
  availability: String,
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["donor", "ngo", "volunteer", "admin"],
    },
    donor: donorSchema,
    ngo: ngoSchema,
    volunteer: volunteerSchema,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
