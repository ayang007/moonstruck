let User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    const _id = req.body.UserID;
    const UserID = req.body.UserID;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const PartnerID = req.body.PartnerID;

    const newUser = new User({
        _id,
        UserID, 
        Username, 
        Password,
        PartnerID
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

const getUser = async (req, res) => {
    const UserID = req.body.UserID;
    User.findById(UserID)
        .then((user) => {
            res.json(user)
        })
}

// https://www.youtube.com/watch?v=Ejg7es3ba2k

const login = async (req, res) => {
    const user = await User.findOne({
        Username: req.body.Username,
        Password: req.body.Password
    })

    if (user) {
        const token = jwt.sign({
            Username: user.Username,
        }, process.env.SECRET)

        //return res.json({ status: 'ok', user: true })
        return res.json(token);
    } else {
        return res.json({ status: 'error', user: false})
    }
}

/*const getInfo = async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        const Username = decoded.Username;
        const user = await User.findOne({
            Username: Username
        })

        return res.json({
            status: 'ok',
            name: user.Username
        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
}*/

module.exports = {
    addUser,
    getUser,
    login,
}