const express = require('express');
const router = express.Router();
const getData = require('../controllers/index');

router.get('/', getData);

module.exports = router;