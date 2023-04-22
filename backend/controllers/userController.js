let User = require('../models/userModel')

const addUser = async (req, res) => {
    const UserID = req.body.UserID
    const Username = req.body.Username;
    const PartnerID = req.body.PartnerID;

    const newUser = new User({
        UserID, 
        Username, 
        PartnerID
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = {
    addUser
}