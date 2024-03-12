const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    name: { type: String, required: true},
    description: {type: String, required: true},
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Subject', Subject);
// so it