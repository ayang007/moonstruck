const express = require('express');

const {
    addPostIt,
    deletePostIt
} = require('../controllers/bulletinController');

const router = express.Router();

router.put('/', addPostIt);

router.delete('/', deletePostIt);

module.exports = router;