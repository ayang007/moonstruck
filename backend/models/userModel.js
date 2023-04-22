const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        Username: { type: String, required: true},
        Password: { type: String, required: true },
        PartnerID: { type: String, required: false },
        BB: { type: String, required: false }
    },
    { collection: 'user-data' }
)

const User = mongoose.model('User', userSchema)

module.exports = User;