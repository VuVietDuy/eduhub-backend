const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const { upload } = require("../middlewares/upload.middleware");

router.get("/", quizController.getAllQuiz);
router.post("/",upload.single('img'), quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
router.get("/:id/questions", quizController.getAllQuestionFromQuiz);
router.delete("/:id", quizController.deleteQuizById);
router.put("/", quizController.updateQuiz);
router.post("/:quizId/submit", quizController.submitQuiz);

module.exports = router;