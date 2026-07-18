const express = require('express');
const router = express.Router();
const getData = require('../controllers/index');

router.post('/register', getData);


module.exports = router;