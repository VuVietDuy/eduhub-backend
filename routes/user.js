const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')


router.get('/',authMiddleware.isAuth, userController.getAllUser);
router.post('/', userController.createNewUser);
router.delete('/:id',authMiddleware.isAuth, userController.deleteUser);

module.exports = router;