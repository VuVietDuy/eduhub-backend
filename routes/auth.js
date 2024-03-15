const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')

router.post('/login', function(req, res, next) {
    return res.json(req.body)
});

router.post('/register', authController.register);

module.exports = router;