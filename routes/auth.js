const express = require('express');
const router = express.Router();

router.post('/login', function(req, res, next) {
    res.json(req.body)
});

router.post('/register', function(req, res, next) {
    res.json(req.body)
});

module.exports = router;