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

        const _id = bulletin.Notes.length;
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
            'error': 'Token is invalid.'
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
            'error': 'Token is invalid.'
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
            'error': 'Token is invalid.'
        })
    }
}

module.exports = {
    addPostIt,
    deletePostIt,
    getAllPostIts
}