const comment = require("../models/Comment");

async function deleteCommentById(req, res) {
  const commentId = req.params.id;
  await comment
    .findByIdAndDelete(commentId)
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
  await comment
    .findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
        updatedAt: req.body.updatedAt,
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
