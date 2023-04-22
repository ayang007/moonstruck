require('dotenv').config()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const getTimezone = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.JWT, process.env.SECRET)
        const Username = decoded.Username;
        const user = await User.findOne({
            Username: Username
        })

        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        const partner = await User.findOne({
            Username: user.PartnerID
        })

        if (!partner) {
            return res.status(500).json({
                'error': 'Partner is invalid.'
            })
        }
        const timestamp = Math.floor(Date.now() / 1000);

        const userLatitude = user.Latitude;
        const userLongitude = user.Longitude;
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const userUrl = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + userLatitude + '%2C' + userLongitude + '&timestamp=' + timestamp + '&key=' + apiKey
        
        const userTZResponse = await GoogleMapsRequest(userUrl);

        if (!userTZResponse || (userTZResponse.status === "ZERO_RESULTS")) {
            return res.status(500).json({
                'error': 'Invalid Latitude or Longitude coordinates'
            })
        }

        const UserUTCOffset = (userTZResponse.rawOffset) / 3600

        const partnerLatitude = partner.Latitude;
        const partnerLongitude = partner.Longitude;
        const partnerUrl = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + partnerLatitude + '%2C' + partnerLongitude + '&timestamp=' + timestamp + '&key=' + apiKey

        const partnerTZResponse = await GoogleMapsRequest(partnerUrl);

        if (!partnerTZResponse || (partnerTZResponse.status === "ZERO_RESULTS")) {
            return res.status(500).json({
                'error': 'Invalid Latitude or Longitude coordinates'
            })
        }

        const PartnerUTCOffset = (partnerTZResponse.rawOffset) / 3600

        return res.status(200).json({
            HourDelta: PartnerUTCOffset - UserUTCOffset
        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
}

async function GoogleMapsRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
          }
        }
      };
      xhr.onerror = function () {
        reject(new Error('Network error'));
      };
      xhr.send("");
    });
    
}

module.exports = {
    getTimezone
}