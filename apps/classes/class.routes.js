const express = require('express');
const router = express.Router();
const classController = require('./class.controller')

router.get('/', classController.getAllClasses);
router.post('/', classController.createNewClass);
router.get('/:id', classController.getClassById);
router.get('/:classId/students', classController.getStudentsClassById);
router.get('/:classId/subjects', classController.getClassSubjectByClassId);
// router.delete('/:id', classController.deleteClass);

module.exports = router;