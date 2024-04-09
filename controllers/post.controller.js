const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function createNewPost(req, res) {
  const newPost = new Post(req.body);

  newPost.createdBy = req.userId;

  await newPost
    .save()
    .then((Post) => {
      return res.status(200).json({
        success: true,
        message: "Tạo bài đăng thành công",
        data: Post,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: null,
      });
    });
}

async function getAllPosts(req, res) {
  await Post.find()
    .then((Posts) => {
      return res.status(200).json({
        success: true,
        message: "Lấy danh sách bài viết thành công!",
        data: Posts,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: null,
      });
    });
}

async function getPostById(req, res) {
  const reqId = req.params.id;

  await Post.findById(reqId)
    .then((post) => {
      return res.status(200).json({
        success: true,
        message: "Lấy bài post thành công",
        data: post,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "lấy bài post thất bại",
        data: null,
      });
    });
}

async function deletePostById(req, res) {
  const reqId = req.params.id;
  await Post.findByIdAndDelete(reqId)
    .then((post) => {
      return res.status(200).json({
        success: true,
        message: "Xóa bài poss thành công",
        data: post,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Xóa bài post thất bại ",
      });
    });
}

async function updatePostById(req, res) {
  const reqId = req.params.id;
  console.log("check req: ", req.body);
  if (!reqId) {
    return res.status(400).jsonI({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Post.findByIdAndUpdate(
      reqId,
      {
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        content: req.body.content,
        comments: req.body.comments,
      },
      {
        returnDocument: "after",
      }
    )
      .then((post) => {
        return res.status(200).json({
          success: true,
          message: "Chỉnh sửa bài viết thành công!",
          data: post,
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
}

async function createComment(req, res) {
  const postId = req.params.postId;
  const newComment = new Comment({
    targetId: postId,
    content: req.body.content,
    createAt: req.body.createAt,
    createdBy: req.userId,
  });
  await newComment
    .save()
    .then((comment) => {
      return res.status(200).json({
        success: true,
        message: "Tạo comment thành công",
        data: comment,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Tạo comment thất bại",
        data: null,
      });
    });
}

async function getAllComments(req, res) {
  const postId = req.params.postId;
  await Comment.find({ "targetId": postId })
    .then((Comment) => {
      return res.status(200).json({
        success: true,
        message: "Lấy danh sách comment thành công!",
        data: Comment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Lấy comment thất bại",
        data: null,
      });
    });
}

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
  createComment,
  getAllComments,
};
