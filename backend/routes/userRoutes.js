const express = require('express');

const {
    addUser,
    getUser,
    login
} = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);

router.get('/get', getUser);

router.post('/login', login);

module.exports = router;