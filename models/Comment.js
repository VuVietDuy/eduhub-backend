const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
    content: { type: String, required: true },
    post: { type: ObjectId, ref: "Post", required: true },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", Comment);
