const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    displayName: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now
    },
    // other features
    isOnline: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Member', MemberSchema)