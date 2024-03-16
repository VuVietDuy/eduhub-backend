const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/', userController.getAllUser);
router.post('/', userController.createNewUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;