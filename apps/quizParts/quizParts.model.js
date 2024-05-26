const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QuizPart = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  questions: { type: [ObjectId] },
});

module.exports = mongoose.model("Option", Option);
