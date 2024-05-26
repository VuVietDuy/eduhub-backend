const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quiz = new Schema({
  quizzId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeLimit: { type: Number, required: true },
  subjectId: { type: ObjectId, ref: "Subject", required: true },
  grade: { type: Number, required: true },
  imgUrl: { type: String },
  createdBy: {
    type: ObjectId,
    ref: "Teacher",
    required: true,
  },
  topic: { type: [String] },
  shuffleQuestion: { type: Boolean, default: true },
  shuffleAnswer: { type: Boolean, default: true },
  status: { type: Boolean, required: true, default: false },
  assignedClass: [{ type: String }],
  quizParts: {
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        questions: { type: [ObjectId], required: true },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", Quiz);
