const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");

router.get("/", quizController.getAllQuiz);
router.post("/", quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
router.delete("/:id", quizController.deleteQuiz);
router.put("/:id", quizController.updateQuiz);
module.exports = router;
