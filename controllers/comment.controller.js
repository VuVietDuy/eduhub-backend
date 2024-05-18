const Comment = require("../models/Comment");
const User = require("../apps/users/user.model");

async function deleteCommentById(req, res) {
  const commentId = req.params.id;
  const userId = req.userId;

  await Comment
    .findOneAndDelete({ "_id": commentId, "createdBy": userId })
    .then((comment) => {
      return res.status(200).json({
        success: true,
        message: "Xóa comment thành công",
        data: comment,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Xóa comment thất bại",
        data: null,
      });
    });
}

async function updateCommentById(req, res) {
  const commentId = req.params.id;
  await Comment
    .findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
        updatedAt: Date.now(),
      },
      {
        returnDocument: "after",
      }
    )
    .then((comment) => {
      return res.status(200).json({
        success: true,
        message: "Chỉnh sửa bài viết thành công!",
        data: comment,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Sever error. Please try again!",
        error: err.message,
      });
    });
}

module.exports = {
  deleteCommentById,
  updateCommentById,
};
