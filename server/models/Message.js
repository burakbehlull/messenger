const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    senderUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    buyerUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    dmId: {
        type: Schema.Types.ObjectId,
        ref: 'DM'
    },
    messageId: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('Message', MessageSchema)