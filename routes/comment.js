const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.delete("/:id", commentController.deleteCommentById);
router.put("/:id", commentController.updateCommentById);
module.exports = router;
