let User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const updateLocation = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User's ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        const potentialLatitude = parseFloat(req.body.Latitude);
        const potentialLongitude = parseFloat(req.body.Longitude);

        if (isNaN(potentialLatitude)) {
            return res.status(500).json({
                'error': 'Latitude is a not a number.'
            });
        }

        if (isNaN(potentialLongitude)) {
            return res.status(500).json({
                'error': 'Longitude is a not a number.'
            });
        }

        user.Latitude = potentialLatitude;
        user.Longitude = potentialLongitude;
        user.LocationLastUpdated = Math.floor(Date.now() / 1000);
        let userUpdateError = false;

        user.save().catch(() => userUpdateError = true);

        if (userUpdateError) {
            return res.status(500).json({
                'error': 'Error updating user document.'
            });
        }

        return res.status(200).json({
            'OK': 'OK'
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const getLocation = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User's ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }



        return res.status(200).json({
            'Latitude': user.Latitude,
            'Longitude': user.Longitude,
            'LastUpdated': user.LocationLastUpdated,
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

module.exports = {
    updateLocation,
    getLocation
}