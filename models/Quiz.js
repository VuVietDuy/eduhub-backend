const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quiz = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeLimit: { type: Number, required: true },
  deadline: { type: Date },
  imgURL: { type: String },
  subjectId: { type: ObjectId, ref: "Subject", required: true },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  level: { type: Number, required: true },
  active: { type: Boolean },
  showResult: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", Quiz);
