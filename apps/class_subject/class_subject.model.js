const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSubject = new Schema({
    teacher: {
        type: Schema.ObjectId,
        ref: "User",
        require: true,
    },
    class: {
        type: Schema.ObjectId,
        ref: "Class",
        required: true,
    },
    subject: {
        type: Schema.ObjectId,
        ref: "Subject",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('ClassSubject', ClassSubject);
// Số ít