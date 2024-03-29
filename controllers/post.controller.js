const Post = require('../models/Post');

async function createNewPost(req, res) {
    var newPost = new Post(req.body);

    await newPost.save()
        .then(Post => {
            return res.status(200).json({
                success: true,
                message: 'Tạo bài đăng thành công',
                data: Post,
            })
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
                data: null,
            })
        })
}

module.exports = {
    createNewPost,
}