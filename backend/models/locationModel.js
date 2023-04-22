const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
    {
        UserID: { type: String, required: true },
        Location: { type: String, required: true},
        LastUpdated: { type: long, required: true }
    },
    { collection: 'location-data' }
)

const Location = mongoose.model('Location', locationSchema)

module.exports = Location;