const express = require("express");
const router = express.Router();

const authentication = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const register = require("../controllers/register");
const login = require("../controllers/login");
const addFoodController = require("../controllers/addFoodController");
const getProfile = require("../controllers/profileController");

router.post("/register", register);
router.post("/login", login);

router.post(
  "/donor/add-food",
  authentication,
  requireRole(["donor"]),
  addFoodController,
);

// Dashboard
// router.get("/donor", authentication, donor);
// router.get("/ngo", authentication, getProfile);
// router.get("/volunteer", authentication, getProfile);

router.get("/me", authentication, getProfile);

module.exports = router;
