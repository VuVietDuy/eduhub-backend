const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const { upload } = require("../middlewares/upload.middleware");

router.post("/", upload.single("img"), quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
router.get("/:id/questions", quizController.getAllQuestionFromQuiz);
router.get("/", quizController.getAllQuiz);
router.delete("/:id", quizController.deleteQuizById);
router.put("/", quizController.updateQuiz);

module.exports = router;
