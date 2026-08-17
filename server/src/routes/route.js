const express = require("express");
const router = express.Router();

const authentication = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");

const addFoodController = require("../controllers/donor/addFoodController");
const getMyDonations = require("../controllers/donor/getMyDonations");

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
  require("../controllers/ngo/getAvailableFoods"),
);

router.post(
  "/ngo/reserve-food/:foodId",
  authentication,
  requireRole(["ngo"]),
  require("../controllers/ngo/reserveFood"),
);

router.get(
  "/ngo/my-reservations",
  authentication,
  requireRole(["ngo"]),
  require("../controllers/ngo/myReservations"),
);

//Volunteer

router.get(
  "/volunteer/pickup-requests",
  authentication,
  requireRole(["volunteer"]),
  require("../controllers/volunteer/pickupRequests"),
);

router.patch(
  "/volunteer/accept-food/:id",
  authentication,
  requireRole(["volunteer"]),
  require("../controllers/volunteer/acceptFood"),
);

router.get(
  "/volunteer/my-deliveries",
  authentication,
  requireRole(["volunteer"]),
  require("../controllers/volunteer/myDeliveries"),
);

router.patch(
  "/volunteer/mark-pickedup/:id",
  authentication,
  requireRole(["volunteer"]),
  require("../controllers/volunteer/markPickedUp"),
);

router.patch(
  "/volunteer/mark-delivered/:id",
  authentication,
  requireRole(["volunteer"]),
  require("../controllers/volunteer/markDelivered"),
);

router.get("/me", authentication, getProfile);

module.exports = router;
