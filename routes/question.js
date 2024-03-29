const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");

router.get("/", questionController.getAllQuestion);
router.post("/", questionController.createNewQuestion);
router.get("/:id", questionController.getQuestionById);
router.delete("/:id", questionController.deleteQuestionById);
router.put("/", questionController.updateQuestion);

module.exports = router;
