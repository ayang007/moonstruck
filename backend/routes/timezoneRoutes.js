const express = require('express');

const {
    getTimezone
} = require('../controllers/timezoneController');

const router = express.Router();

router.get('/:JWT', getTimezone);

module.exports = router;