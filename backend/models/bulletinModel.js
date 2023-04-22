const mongoose = require('mongoose')

// https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index
const bulletinSchema = new mongoose.Schema(
    {
        //Location: { type: String, required: true},
        //LastUpdated: { type: Number, required: true }
        UserID: { type: String, required: true },
        /*Notes: [
            {
                NoteID: { type: Number, required: true },
                PosX: { type: Number, required: true },
                PosY: { type: Number, required: true },
                Rotation: { type: Number, required: true },
                Color: { type: String, required: true },
            }
        ]*/
        Notes: { type: Array, "default": []}
    },
    { collection: 'bulletin-data' }
)

const Bulletin = mongoose.model('Bulletin', bulletinSchema)

module.exports = Bulletin;