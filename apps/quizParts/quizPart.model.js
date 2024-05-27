const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QuizPart = new Schema({
  quizId: { type: ObjectId, ref: "Quiz", required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

module.exports = mongoose.model("QuizPart", QuizPart);
