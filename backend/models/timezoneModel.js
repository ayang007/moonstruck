const mongoose = require('mongoose')

const timezoneSchema = new mongoose.Schema(
    {
        UserID: { type: String, required: true },
        Timezone: { type: String, required: true}
    },
    { collection: 'timezone-data' }
)

const Timezone = mongoose.model('Timezone', timezoneSchema)

module.exports = Timezone;