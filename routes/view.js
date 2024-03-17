const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/login', function(req, res, next) {
    res.render('login')
})

router.get('/register', function(req, res, next) {
    res.render('register')
})

router.get('/user', function(req, res, next) {
    User.find()
    .then(users => {
        res.render('user', { users: users })
    })
})

module.exports = router;
