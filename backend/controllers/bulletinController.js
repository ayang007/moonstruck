let User = require('../models/userModel');
const {
    PostIt,
    Bulletin
} = require('../models/bulletinModel');
const jwt = require('jsonwebtoken');

const addPostIt = async (req, res) => {
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

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        const _id = bulletin.TotalNotes;
        const PosX = req.body.PosX || 0;
        const PosY = req.body.PosY || 0;
        const Rotation = req.body.Rotation || 0;
        const Color = req.body.Color;
        const Type = req.body.Type;
        const Content = req.body.Content;

        bulletin.TotalNotes = bulletin.TotalNotes + 1;

        const newPostIt = new PostIt({
            _id,
            PosX,
            PosY,
            Rotation,
            Color,
            Type,
            Content
        });

        let bulletinUpdateError = false;
        bulletin.Notes.push(newPostIt);
        bulletin.save().catch(() => bulletinUpdateError = true);

        if (bulletinUpdateError) {
            return res.status(500).json({
                'error': 'Error updating bulletin document.'
            });
        }

        return res.status(200).json({
            'NoteID': _id
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const updatePostIt = async (req, res) => {
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

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        // Delete the post-it note
        let bulletinUpdateError = false;
        const lengthBefore = bulletin.Notes.length;
        bulletin.Notes = bulletin.Notes.filter((obj) => {
            return obj._id !== req.body.NoteID
        })
        const lengthAfter = bulletin.Notes.length;

        if (lengthBefore === lengthAfter) {
            return res.status(500).json({
                'error': 'Note ID does not exist.'
            });
        }

        // Add the post-it note with the same NoteID
        const _id = req.body.NoteID;
        const PosX = req.body.PosX || 0;
        const PosY = req.body.PosY || 0;
        const Rotation = req.body.Rotation || 0;
        const Color = req.body.Color;
        const Type = req.body.Type;
        const Content = req.body.Content;

        const newPostIt = new PostIt({
            _id,
            PosX,
            PosY,
            Rotation,
            Color,
            Type,
            Content
        });

        bulletin.Notes.push(newPostIt);

        bulletin.save().catch(() => bulletinUpdateError = true);

        if (bulletinUpdateError) {
            return res.status(500).json({
                'error': 'Error updating bulletin document.'
            });
        }

        return res.status(200).json({
            "OK": "OK"
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const deletePostIt = async (req, res) => {
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

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        let bulletinUpdateError = false;
        const lengthBefore = bulletin.Notes.length;
        bulletin.Notes = bulletin.Notes.filter((obj) => {
            return obj._id !== req.body.NoteID
        })
        const lengthAfter = bulletin.Notes.length;

        if (lengthBefore === lengthAfter) {
            return res.status(500).json({
                'error': 'Note ID does not exist.'
            });
        }

        bulletin.save().catch(() => bulletinUpdateError = true);

        if (bulletinUpdateError) {
            return res.status(500).json({
                'error': 'Error updating bulletin document.'
            });
        }

        return res.status(200).json({
            "OK": "OK"
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const getAllPostIts = async (req, res) => {
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

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        return res.status(200).json({
            "Notes": bulletin.Notes
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const setCountdown = async (req, res) => {
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

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        let bulletinUpdateError = false;
        bulletin.Countdown = req.body.Meet;

        bulletin.save().catch(() => bulletinUpdateError = true);

        if (bulletinUpdateError) {
            return res.status(500).json({
                'error': 'Error updating bulletin document.'
            });
        }

        return res.status(200).json({
            "OK": "OK"
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

const getCountdown = async (req, res) => {
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

        const bulletin = await Bulletin.findOne({
            _id: user.BB
        })

        if (!bulletin) {
            return res.status(500).json({
                'error': 'Bulletin is invalid.'
            })
        }

        if (!bulletin.Countdown) {
            return res.status(200).json({
                "Meet": null
            })
        }

        return res.status(200).json({
            "Meet": bulletin.Countdown
        });
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

module.exports = {
    addPostIt,
    updatePostIt,
    deletePostIt,
    getAllPostIts,
    setCountdown,
    getCountdown,
}