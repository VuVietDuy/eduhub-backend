const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  content: { type: String, required: true },
  targetId: { type: ObjectId, required: true },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", Comment);
