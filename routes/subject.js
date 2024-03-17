const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller')

router.get('/', subjectController.getAllSubject);
router.post('/', subjectController.createNewSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;