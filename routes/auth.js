const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authMiddleware.isAuth, authController.logout)
router.get('/verify/:token', authController.verify)


module.exports = router;