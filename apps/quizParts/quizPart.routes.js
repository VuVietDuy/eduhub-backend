const express = require("express");
const router = express.Router();
const quizPartController = require("./quizPart.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware.isAuth, quizPartController.createNewQuizPart);
router.get("/:id", authMiddleware.isAuth, quizPartController.getQuizPartById);
router.get("/", authMiddleware.isAuth, quizPartController.getAllQuizPartOfQuiz);
// router.get("/", authMiddleware.isAuth, quizPartController.getAllquizPartOfPart);
router.delete(
  "/:id",
  authMiddleware.isAuth,
  quizPartController.deleteQuizPartById
);
router.put("/:id", quizPartController.updateQuizPartById);

module.exports = router;
