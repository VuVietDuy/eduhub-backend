const express = require("express");
const router = express.Router();
const questionController = require("./question.controller");

router.post("/", questionController.createNewQuestion);
router.get("/:quizId", questionController.getQuestionById);
router.delete("/:id", questionController.deleteQuestionById);
router.put("/:questionId", questionController.updateQuestionById);

module.exports = router;
