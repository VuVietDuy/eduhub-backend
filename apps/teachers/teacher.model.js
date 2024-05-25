const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({
    userId: { type: Schema.ObjectId, ref: "User", required: true },
    teacherId: { type: String, required: true },
    academicLevel: { type: String, required: false },
    position: { type: String, required: false },
    specialize: { type: Schema.ObjectId, ref: "Subject", required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

Teacher.path("userId").index({ unique: false })

module.exports = mongoose.model('Teacher', Teacher)
