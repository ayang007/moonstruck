const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        UserID: { type: String, required: true },
        Username: { type: String, required: true},
        PartnerID: { type: String, required: true }
    },
    { collection: 'user-data' }
)

const User = mongoose.model('User', userSchema)

module.exports = User;