const express = require("express");
const router = express.Router();
const quizController = require("./quiz.controller");
const { upload } = require("../../middlewares/upload.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware.isAuth,
  upload.single("img"),
  quizController.createNewQuiz
);
// router.get("/:id", quizController.getQuizById);
router.get("/:quizId/questions", quizController.getAllQuestionFromQuiz);
router.get("/", authMiddleware.isAuth, quizController.getAllQuiz);
router.get("/:grade", authMiddleware.isAuth, quizController.getQuizByGrade);
router.delete("/:id", authMiddleware.isAuth, quizController.deleteQuizById);
router.put("/", authMiddleware.isAuth, quizController.updateQuiz);
router.post("/:quizId/submit", quizController.submitQuiz);

module.exports = router;

/**
 * getAllQuiz: lấy theo giáo viên/userId
 * http://.../quizzes
 * http://.../quizzes/:quizId
 */
