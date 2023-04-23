const express = require('express');

const {
    addUser,
    getUser,
    login,
    registerUser,
    mergeUser,
    checkMerge,
    getPeriod,
    setPeriod
} = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);

router.get('/get', getUser);

router.post('/login', login);

router.put('/auth', registerUser);

router.patch('/auth', mergeUser);

router.get('/auth/:JWT', checkMerge);

router.get('/period/:JWT', getPeriod);

router.patch('/period', setPeriod);

module.exports = router;