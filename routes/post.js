const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { upload } = require("../middlewares/upload.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/", isAuth, postController.createNewPost);
router.post("/:postId/comments", isAuth, postController.createComment);
router.get("/:postId/comments", postController.getAllComments);
router.get("/:id", postController.getPostById);
router.get("/", postController.getAllPosts);
router.delete("/:id", postController.deletePostById);
router.put("/:id", postController.updatePostById);

module.exports = router;
// tạo comment của post: resource cha post => resource con comment /posts/postId/comment
// lấy tất cà comment của post: resource cha post => resource con comment /posts/postId/comment
// sửa comment comments/commentId
// xóa comment comments/commentId
