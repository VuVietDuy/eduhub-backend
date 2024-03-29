const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Answer = new Schema({
  questionId: { type: ObjectId, ref: "Question", required: true },
  content: { type: String, required: true },
  isCorrect: { type: Boolean },
//   imgUrls: { type: [String] },
});

module.exports = mongoose.model("Answer", Answer);
