const express = require('express');

const {
    addPostIt,
    deletePostIt,
    getAllPostIts,
    setCountdown,
    getCountdown
} = require('../controllers/bulletinController');

const router = express.Router();

router.put('/', addPostIt);

router.delete('/', deletePostIt);

router.get('/:JWT', getAllPostIts);

router.post('/countdown', setCountdown);

router.get('/countdown/:JWT', getCountdown);

module.exports = router;