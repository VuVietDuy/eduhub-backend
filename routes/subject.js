const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller')

router.get('/', subjectController.getAllSubject);
router.post('/', subjectController.createNewSubject);

module.exports = router;