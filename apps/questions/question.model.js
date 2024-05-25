const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Question = new Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, required: true },
  quizId: { type: ObjectId, ref: "Quiz", required: true },
  level: { type: Number },
  orderNum: { type: Number, default: 0 },
  answer: { type: [ObjectId], ref: "Question", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", Question);
