require('dotenv').config()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const getWeather = async (req, res) => {
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

        const partner = await User.findOne({
            Username: user.PartnerID
        })

        // Partner's ID does not exist
        if (!partner) {
            return res.status(500).json({
                'error': 'Partner is invalid.'
            })
        }

        const partnerLatitude = partner.Latitude;
        const partnerLongitude = partner.Longitude;
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + partnerLatitude + '&lon=' + partnerLongitude + '&appid=' + apiKey;

        const weatherResponse = await OpenWeatherRequest(url).catch((response) => console.log(response));

        // Under weatherResponse.weather[0].main:
        // Thunderstorm, Drizzle, Rain
        // Clouds
        // Clear

        let rain = false;
        let clouds = false;
        let day = true;
        const temperature = ((9.0 / 5.0 * (weatherResponse.main.temp - 273.15)) + 32).toFixed(2)
        
        if ((weatherResponse.weather[0].main === 'Thunderstorm') || (weatherResponse.weather[0].main === 'Drizzle') || (weatherResponse.weather[0].main === 'Rain')) {
            rain = true;
        }

        if ((weatherResponse.weather[0].main === 'Clouds')) {
            clouds = true;
        }

        if ((weatherResponse.sys.dt < weatherResponse.sys.sunrise) || (weatherResponse.sys.dt < weatherResponse.sys.sunset)) {
            day = false;
        }

        return res.status(200).json({
            rain: rain,
            clouds: clouds,
            day: day,
            description: weatherResponse.weather[0].description,
            temperature: temperature
        })
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

async function OpenWeatherRequest(url) {
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
    getWeather
}