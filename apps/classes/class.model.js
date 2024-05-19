const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    course: { type: String, required: true },
    className: { type: String, required: false },
    formTeacher: {
        type: Schema.ObjectId,
        ref: "User",
        require
    },
    monitor: {
        type: Schema.ObjectId,
        ref: "User",
        required: false,
    },
    viceMonitor: {
        type: Schema.ObjectId,
        ref: "User",
        required: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Class', Class);
// Số ít