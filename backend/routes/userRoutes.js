const express = require('express');
const { mainModule } = require('process');

const {
    addUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);

module.exports = router;