const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quiz = new Schema({
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
  assignedStatus: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", Quiz);
