const express = require("express");
const router = express.Router();

const authentication = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const register = require("../controllers/register");
const login = require("../controllers/login");

const addFoodController = require("../controllers/addFoodController");
const getMyDonations = require("../controllers/getMyDonations");

const getAvailableFoods = require("../controllers/getAvailableFoods");

const getProfile = require("../controllers/profileController");

router.post("/register", register);
router.post("/login", login);

// Donor
router.post(
  "/donor/add-food",
  authentication,
  requireRole(["donor"]),
  addFoodController,
);

router.get(
  "/donor/my-donations",
  authentication,
  requireRole(["donor"]),
  getMyDonations,
);

// NGO
router.get(
  "/ngo/available-foods",
  authentication,
  requireRole(["ngo"]),
  getAvailableFoods,
);

router.post(
  "/ngo/reserve-food/:foodId",
  authentication,
  requireRole(["ngo"]),
  require("../controllers/reserveFood"),
);

router.get("/me", authentication, getProfile);

module.exports = router;
