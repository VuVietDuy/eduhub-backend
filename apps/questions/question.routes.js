const express = require("express");
const router = express.Router();
const questionController = require("./question.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware.isAuth, questionController.createNewQuestion);
router.get("/:id", authMiddleware.isAuth, questionController.getQuestionById);
router.get("/", authMiddleware.isAuth, questionController.getAllQuestionOfPart);
router.delete(
  "/:id",
  authMiddleware.isAuth,
  questionController.deleteQuestionById
);
router.put("/:questionId", questionController.updateQuestionById);

module.exports = router;
