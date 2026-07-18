const express = require('express');
const router = express.Router();
const getData = require('../controllers/users');

router.post('/register', getData);


module.exports = router;