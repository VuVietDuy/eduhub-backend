const express = require('express');
const router = express.Router();
const classController = require('./class.controller')

router.get('/', classController.getAllClasses);
router.post('/', classController.createNewClass);
router.get('/:id', classController.getClassById);
// router.delete('/:id', classController.deleteClass);

module.exports = router;