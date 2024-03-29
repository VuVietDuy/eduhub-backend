const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const quizController = require("../controllers/quiz.controller");
const {upload} = require('../middlewares/upload.middleware')
=======
const quizController = require("../controllers/quizzes.controller");
>>>>>>> b0d85d1b3fd0a3509f63dacbfa1b1759e8aabf72

router.get("/", quizController.getAllQuiz);
router.post("/",upload.single('img'), quizController.createNewQuiz);
router.get("/:id", quizController.getQuizById);
<<<<<<< HEAD
router.delete("/:id", quizController.deleteQuiz);
router.put("/:id", quizController.updateQuiz);

=======
router.get("/:id/questions", quizController.getAllQuestionFromQuiz);
router.delete("/:id", quizController.deleteQuizById);
router.put("/", quizController.updateQuiz);
>>>>>>> b0d85d1b3fd0a3509f63dacbfa1b1759e8aabf72
module.exports = router;
