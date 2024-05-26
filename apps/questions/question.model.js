const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Question = new Schema({
  orderNum: { type: Number, default: 0 },
  questionContent: { type: String, required: true },
  questionType: { type: String, required: true },
  partID: { type: ObjectId, ref: "Part", required: true },
  img: { type: String },
  audio: { type: String },
  options: { type: [ObjectId], ref: "Options", required: true },
  explaination: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", Question);
