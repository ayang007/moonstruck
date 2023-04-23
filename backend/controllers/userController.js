var mongoose = require('mongoose');
let User = require('../models/userModel');
const {
    Bulletin
} = require('../models/bulletinModel');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    const _id = req.body.Username;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const PartnerID = req.body.PartnerID;

    const newUser = new User({
        _id,
        Username, 
        Password,
        PartnerID
    });

    newUser.save()
        .then(() => {
            return res.status(200).json('User added!')
        })
        .catch(err => {
            return res.status(500).json('Error: ' + err)
        });
}

const getUser = async (req, res) => { // MAKE MORE ROBUST
    const Username = req.body.Username;
    User.findById(Username)
        .then((user) => {
            return res.status(200).json(user)
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
        return res.status(200).json({
            JWT: token
        });
    } else {
        return res.status(500).json({ status: 'error', user: false})
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

const registerUser = async (req, res) => {
    const user = await User.findOne({
        Username: req.body.Username
    })

    if (user) { // Username is already taken; send out an error
        return res.status(500).json({
            error: 'Username has already been taken.'
        })
    } else {
        const _id = req.body.Username;
        const Username = req.body.Username;
        const Password = req.body.Password;
        const Latitude = 0;
        const Longitude = 0;
        const LocationLastUpdated = Math.floor(Date.now() / 1000);

        const newUser = new User({
            _id,
            Username, 
            Password,
            Latitude,
            Longitude,
            LocationLastUpdated
        });

        const token = jwt.sign({
            Username: Username,
        }, process.env.SECRET)

        newUser.save()
            .then(() => {
                return res.status(200).json({
                    JWT: token
                })
            })
            .catch(err => {
                return res.status(500).json('Error: ' + err)
            });
    }
}

const mergeUser = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User's ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        // User passed in themselves as the partner
        if (decoded.Username === req.body.PartnerID) {
            return res.status(500).json({
                'error': 'Partner has the same ID as this user.'
            })
        }

        // User already has a partner
        if (user.PartnerID) {
            return res.status(500).json({
                'error': 'User already has a partner.'
            })
        }

        const partner = await User.findOne({
            Username: req.body.PartnerID
        })

        // Partner's ID does not exist
        if (!partner) {
            return res.status(500).json({
                'error': 'Partner is invalid.'
            })
        }

        // Partner already has a partner
        if (partner.PartnerID) {
            return res.status(500).json({
                'error': 'Partner already has a partner.'
            })
        }

        // Generate the bulletin board
        var _id = new mongoose.Types.ObjectId(); // ID of the board
        var bulletinID = _id.toString();
        console.log(bulletinID);
        
        const Notes = [];
        const TotalNotes = 0;

        let Period = [];

        // Initialize the period calendar; an array with 35 booleans
        for (let i = 0; i < 35; i++) {
            Period.push(false);
        }

        const newBulletinBoard = new Bulletin({
            _id,
            Notes,
            TotalNotes,
            Period
        });

        // Try to update both the user and the partner
        user.PartnerID = req.body.PartnerID;
        user.BB = bulletinID;
        partner.PartnerID = decoded.Username;
        partner.BB = bulletinID;
        
        let userUpdateError = false;
        let partnerUpdateError = false;
        let bulletinUpdateError = false;

        user.save().catch(() => userUpdateError = true);
        partner.save().catch(() => partnerUpdateError = true);
        newBulletinBoard.save().catch(() => bulletinUpdateError = true);

        if (userUpdateError) {
            return res.status(500).json({
                'error': 'Error updating user document.'
            });
        }

        if (partnerUpdateError) {
            return res.status(500).json({
                'error': 'Error updating partner document.'
            });
        }

        if (bulletinUpdateError) {
            return res.status(500).json({
                'error': 'Error creating bulletin document.'
            });
        }

        return res.status(200).json({
            'OK': 'OK'
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const checkMerge = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        // Username has a partner
        if (user.PartnerID) {
            return res.status(200).json({
                PartnerID: user.PartnerID
            })
        } else { // Username does not have a partner
            return res.status(200).json({
                PartnerID: null
            })
        }
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const getPeriod = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        // Username does not have a partner
        if (!user.PartnerID) {
            return res.status(500).json({
                'error': 'User does not have a partner'
            })
        }

        if (!user.BB || !user.PartnerID) {
            return res.status(500).json({
                'error': 'User does not have a partner.'
            })
        }

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        const BBPeriod = bulletin.Period;

        return res.status(200).json({
            "Period": BBPeriod
        })

    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const setPeriod = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        if (req.body.Period.length !== 35) {
            return res.status(500).json({
                'error': 'Period calendars have 35 days.'
            });
        }

        if (!user.BB || !user.PartnerID) {
            return res.status(500).json({
                'error': 'User does not have a partner.'
            })
        }

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        let bulletinUpdateError = false;
        bulletin.Period = req.body.Period;

        bulletin.save().catch(() => bulletinUpdateError = true);

        if (bulletinUpdateError) {
            return res.status(500).json({
                'error': 'Error updating bulletin document.'
            });
        }

        return res.status(200).json({
            "OK": 'OK'
        })

    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const sendMessage = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        const partner = await User.findOne({
            Username: user.PartnerID
        })

        // Partner ID does not exist
        if (!partner) {
            return res.status(500).json({
                'error': 'Partner is invalid.'
            })
        }

        let partnerUpdateError = false;
        partner.PartnerMessage = req.body.Message;
        partner.PartnerOpenDate = req.body.OpenDate;

        partner.save().catch(() => partnerUpdateError = true);

        if (partnerUpdateError) {
            return res.status(500).json({
                'error': 'Error updating partner document.'
            });
        }

        return res.status(200).json({
            "OK": 'OK'
        })

    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const checkMessage = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        if (!user.PartnerMessage || !user.PartnerOpenDate) {
            return res.status(200).json({
                'Message': "",
                "OpenDate": -1
            })
        }

        return res.status(200).json({
            "Message": user.PartnerMessage,
            "OpenDate": user.PartnerOpenDate
        })

    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.JWT, process.env.SECRET);
        const user = await User.findOne({
            Username: decoded.Username
        })

        // User ID does not exist
        if (!user) {
            return res.status(500).json({
                'error': 'Username is invalid.'
            })
        }

        if (!user.PartnerMessage || !user.PartnerOpenDate) {
            return res.status(200).json({
                "OK": "OK"
            })
        }

        let userUpdateError = false;
        user.PartnerMessage = undefined;
        user.PartnerOpenDate = undefined;

        user.save().catch(() => userUpdateError = true);

        if (userUpdateError) {
            return res.status(500).json({
                'error': 'Error updating partner document.'
            });
        }

        return res.status(200).json({
            "OK": "OK"
        })

    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}



module.exports = {
    addUser,
    getUser,
    login,
    registerUser,
    mergeUser,
    checkMerge,
    getPeriod,
    setPeriod,
    sendMessage,
    checkMessage,
    deleteMessage
}