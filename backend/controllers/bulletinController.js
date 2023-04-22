var mongoose = require('mongoose');
let User = require('../models/userModel');
const {
    PostIt,
    Bulletin
} = require('../models/bulletinModel');
const jwt = require('jsonwebtoken');

