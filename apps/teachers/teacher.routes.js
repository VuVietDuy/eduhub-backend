const express = require('express');
const router = express.Router();
const teacherController = require('./teacher.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { upload } = require('../../middlewares/upload.middleware');

router.get('/', authMiddleware.isAuth, teacherController.getAllTeachers);
router.post('/', authMiddleware.isAuth, upload.single('avatar'), teacherController.createNewTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;