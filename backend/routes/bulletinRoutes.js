const express = require('express');

const {
    addPostIt,
    deletePostIt,
    getAllPostIts
} = require('../controllers/bulletinController');

const router = express.Router();

router.put('/', addPostIt);

router.delete('/', deletePostIt);

router.get('/:JWT', getAllPostIts);

module.exports = router;