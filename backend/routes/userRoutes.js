const express = require('express');

const {
    addUser,
    getUser,
    login,
    registerUser,
    mergeUser,
    checkMerge
} = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);

router.get('/get', getUser);

router.post('/login', login);

router.put('/auth', registerUser);

router.patch('/auth', mergeUser);

router.get('/auth/:JWT', checkMerge);

module.exports = router;