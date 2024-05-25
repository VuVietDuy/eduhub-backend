const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema({
    resultId: { type: ObjectId, ref: "Result", required: true },
    questionId: { type: ObjectId, ref: "Question", required: true },
    option: { type: [ObjectId], ref: "Option", required: true },
})

module.exports = mongoose.model('Answer', Answer);
