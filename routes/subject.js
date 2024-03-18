const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller')
const {upload} = require('../middlewares/upload.middleware')

router.get('/', subjectController.getAllSubject);
router.post('/', upload.single('img'), subjectController.createNewSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;