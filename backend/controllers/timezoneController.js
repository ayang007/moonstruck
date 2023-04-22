require('dotenv').config()
let User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

        const userLatitude = user.Latitude;
        const userLongitude = user.Longitude;
        const timestamp = Math.floor(Date.now() / 1000);
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + userLatitude + '%2C' + userLongitude + '&timestamp=' + timestamp + '&key=' + apiKey
        console.log(url);
        
        const tzResponse = await axios.get(url).catch(err => {
            console.log(err)                     //Axios entire error message
            console.log(err.response.data.error) //Google API error message 
          });
        /*axios({
            method: 'get',
            url: url,
            responseType: 'stream'
        }).then((response) => {
            tzResponse = response;
        })*/

        if (!tzResponse || (tzResponse.status === "ZERO_RESULTS")) {
            return res.status(500).json({
                'error': 'Invalid Latitude or Longitude coordinates'
            })
        }


        // https://stackoverflow.com/questions/20712419/get-utc-offset-from-timezone-in-javascript

        const timezoneID = tzResponse.timeZoneId;
        console.log(timezoneID);

        const timeZoneName = Intl.DateTimeFormat("ia", {
            timeZoneName: "short",
            timezoneID,
        })
            .formatToParts()
            .find((i) => i.type === "timeZoneName").value;
        const offset = timeZoneName.slice(3);
        if (!offset) return 0;
        
        const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/);
        if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`;
        
        const [, sign, hour, minute] = matchData;
        let result = parseInt(hour) * 60;
        if (sign === "+") result *= -1;
        if (minute) result += parseInt(minute);
        
        console.log(result);
        console.log(typeof(result));
        const tzDelta = Math.floor(result / 60) * -1;
        
        return res.status(200).json({
            HourDelta: tzDelta
        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
}

module.exports = {
    getTimezone
}