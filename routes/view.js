const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Quiz = require('../models/Quiz')

router.get('/login', function(req, res, next) {
    res.render('login')
})

router.get('/register', function(req, res, next) {
    res.render('register')
})

router.get('/uploads', function(req, res, next) {
    res.render('test_uploads', {imgUrl: null})
})

router.get('/user', function(req, res, next) {
    User.find()
    .then(users => {
        res.render('user', { users: users })

    })
})

router.get('/quiz', function(req, res, next) {
    Quiz.find()
    .then(quizs => {
        res.render('quiz', { quizs: quizs })

    })
})

module.exports = router;
