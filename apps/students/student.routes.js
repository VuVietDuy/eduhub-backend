const express = require('express');
const router = express.Router();
const studentController = require('./student.controller')

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createNewStudent);
router.get('/:id', studentController.deleteStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;