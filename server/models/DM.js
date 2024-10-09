const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DMSchema = new Schema({
	type: {
		type: String,
		enum: ["directMessage","groupMessage"],
		required: true,
	},
    name: {
        type: String,
        required: true,
    },
    users: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Member', 
        required: true 
    }],
    invisible: { 
        type: Array,
    },
    id: {
        type: String
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('DM', DMSchema)