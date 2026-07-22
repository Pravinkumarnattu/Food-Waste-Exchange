const express = require("express");
const router = express.Router();

const register = require("../controllers/register");
const login = require("../controllers/login");
const donor = require("../controllers/donor");
const ngo = require("../controllers/ngo");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/donor", auth, donor);
router.get("/ngo", auth, ngo);

module.exports = router;
