const express = require("express");
const router = express.Router();
const commentController = require("./comment.controller");
const { isAuth } = require("../../middlewares/auth.middleware");

router.delete("/:id", isAuth, commentController.deleteCommentById);
router.put("/:id", commentController.updateCommentById);
module.exports = router;
