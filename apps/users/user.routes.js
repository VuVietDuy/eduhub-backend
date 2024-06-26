const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware')

router.get('/', authMiddleware.isAuth, userController.getAllUser);
router.post('/', userController.createNewUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;