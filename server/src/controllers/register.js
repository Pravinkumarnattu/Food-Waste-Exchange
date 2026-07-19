const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  const { email, password, phone, role } = req.body;
  if (role === "admin") {
    return res.status(403).json({ message: "Cannot register as admin" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let userData = { email, password: hashedPassword, phone, role };
  switch (role) {
    case "donor": {
      const { businessName, businessType, donorAddress } = req.body;
      userData = {
        ...userData,
        donor: { businessName, businessType, donorAddress },
      };
      break;
    }
    case "ngo": {
      const {
        organizationName,
        ngoRegistrationNumber,
        organizationAddress,
        areaOfOperation,
      } = req.body;
      userData = {
        ...userData,
        ngo: {
          organizationName,
          ngoRegistrationNumber,
          organizationAddress,
          areaOfOperation,
        },
      };
      break;
    }
    case "volunteer": {
      const { fullName, volunteerAddress, modeOfTransport, availability } =
        req.body;
      userData = {
        ...userData,
        volunteer: {
          fullName,
          volunteerAddress,
          modeOfTransport,
          availability,
        },
      };
      break;
    }
  }

  try {
    const response = await User.create(userData);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports = register;
