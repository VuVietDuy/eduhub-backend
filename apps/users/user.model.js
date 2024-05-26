const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    email: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: 7 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    placeOfBirth: { type: String },
    permanentAddress: { type: String },
    citizenIdentification: { type: String },
    issuedBy: { type: String },
    avatarUrl: { type: String },
    description: { type: String },
    roleName: { type: Number },//0 là admin 1 là giáo viên 2 là học sinh
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    virtuals: {
        fullName: {
            get() {
                return this.lastName + " " + this.firstName
            }
        }
    }
})

User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

module.exports = mongoose.model('User', User)
