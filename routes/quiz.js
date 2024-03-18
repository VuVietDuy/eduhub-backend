const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const {upload} = require('../middlewares/upload.middleware')

router.get("/", quizController.getAllQuiz);
router.post("/",upload.single('img'), quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
router.delete("/:id", quizController.deleteQuiz);
router.put("/:id", quizController.updateQuiz);

module.exports = router;
