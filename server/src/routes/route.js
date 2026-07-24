const express = require("express");
const router = express.Router();

const register = require("../controllers/register");
const login = require("../controllers/login");
const authentication = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const getProfile = require("../controllers/profileController");

const getAddress = require("../controllers/donorAddress");

router.post("/register", register);
router.post("/login", login);

// Dashboard
// router.get("/donor", authentication, donor);
// router.get("/ngo", authentication, getProfile);
// router.get("/volunteer", authentication, getProfile);

router.get("/donorAddress", authentication, getAddress);

module.exports = router;
