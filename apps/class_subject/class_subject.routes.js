const express = require('express');
const router = express.Router();
const classSubjectController = require('./class_subject.controller')

router.post('/', classSubjectController.createClassSubject)

module.exports = router;