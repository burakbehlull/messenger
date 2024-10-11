const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true,
		trim: true
    },
    displayName: {
        type: String,
        required: true
    }
});

const MessageSchema = new Schema({
	buyerUser: {
        type: userSchema, 
        required: true
    },
    senderUser: {
        type: userSchema,
        required: true
    },
    dmId: {
        type: Schema.Types.ObjectId,
        ref: 'DM'
    },
    id: {
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