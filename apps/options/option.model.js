const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Option = new Schema({
  content: { type: String, required: true },
  isCorrect: { type: Boolean },
  //   imgUrls: { type: [String] },
});

module.exports = mongoose.model("Option", Option);
