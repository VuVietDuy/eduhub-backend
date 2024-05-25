const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: [String] },
    content: { type: String },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    comments: {
        type: ObjectId,
        ref: "Comment",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", Post);
