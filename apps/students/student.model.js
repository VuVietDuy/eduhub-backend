const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    userId: { type: Schema.ObjectId, ref: "User", required: true },
    studentId: { type: String, required: true },
    classId: { type: Schema.ObjectId, ref: "Class", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Student', Student)
