const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const {upload} = require('../middlewares/upload.middleware')

router.post("/", postController.createNewPost);
router.get("/", postController.createNewPost);

module.exports = router;
