const express = require('express');

const {
    addUser,
    getUser,
    login,
    registerUser,
    mergeUser,
    checkMerge,
    getPeriod,
    setPeriod,
    sendMessage,
    checkMessage,
    deleteMessage,
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

router.post('/message', sendMessage);

router.get('/message/:JWT', checkMessage);

router.delete('/message/:JWT', deleteMessage);

module.exports = router;