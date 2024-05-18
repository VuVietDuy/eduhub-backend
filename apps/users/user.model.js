const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: 7 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    avatarUrl: { type: String },
    roleName: { type: Number },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

module.exports = mongoose.model('User', User)
