const mongoose = require('mongoose')

// https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index
const postItSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    PosX: { type: Number, required: true },
    PosY: { type: Number, required: true },
    Rotation: { type: Number, required: true },
    Color: { type: String, required: true },
    Type: { type: String, required: true},
    Content: { type: String, required: true }
})

const bulletinSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        Notes: [postItSchema],
        TotalNotes: { type: Number, required: true },
        Countdown: { type: Number, required: false },
        Period: { type: [Boolean], required: true }
    },
    { collection: 'bulletin-data' }
)

const PostIt = mongoose.model('PostIt', postItSchema);
const Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = {
    PostIt,
    Bulletin
};