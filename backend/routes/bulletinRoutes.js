const express = require('express');

const {
    addPostIt,
    updatePostIt,
    deletePostIt,
    getAllPostIts,
    setCountdown,
    getCountdown
} = require('../controllers/bulletinController');

const router = express.Router();

router.put('/', addPostIt);

router.patch('/', updatePostIt);

router.delete('/', deletePostIt);

router.get('/:JWT', getAllPostIts);

router.post('/countdown', setCountdown);

router.get('/countdown/:JWT', getCountdown);

module.exports = router;