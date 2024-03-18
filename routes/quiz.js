const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizzes.controller");

router.get("/", quizController.getAllQuiz);
router.post("/", quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
router.get("/:id/questions", quizController.getAllQuestionFromQuiz);
router.delete("/:id", quizController.deleteQuizById);
router.put("/", quizController.updateQuiz);
module.exports = router;
