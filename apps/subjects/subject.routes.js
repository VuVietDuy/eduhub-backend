const express = require('express');
const router = express.Router();
const subjectController = require('./subject.controller')
const { upload } = require('../../middlewares/upload.middleware')
const authMiddleware = require('../../middlewares/auth.middleware')

router.get('/', authMiddleware.isAuth, subjectController.getAllSubject);
router.post('/', authMiddleware.isAuth, upload.single('img'), subjectController.createNewSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;