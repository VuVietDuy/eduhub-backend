const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Result = new Schema({
    quizId: { type: ObjectId, ref: "Quiz", required: true },
    userId: { type: ObjectId, ref: "User", required: true },
    score: { type: Number },
    submittedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Result', Result);
