const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz.controller");

router.get("/api/quiz", quizController.getAllQuiz);
router.post("./api/quiz", quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
router.delete("/:id", quizController.deleteQuiz);
router.put("/:id", quizController.updateQuiz);
module.exports = router;
