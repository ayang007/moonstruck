const express = require('express');

const {
    updateLocation,
    getLocation
} = require('../controllers/locationController');

const router = express.Router();

router.put('/', updateLocation);

router.get('/:JWT', getLocation);

module.exports = router;