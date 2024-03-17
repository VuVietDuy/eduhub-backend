const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date},
    avatarUrl: {type: String},
    roleName: {type: Number},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', User)
