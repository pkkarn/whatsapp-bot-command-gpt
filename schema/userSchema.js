const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        default: 'No Name'
    }, 
    points: {
        type: Number,
        default: 0,
    }
}, {timestamps: true})

module.exports = mongoose.model('user', UserSchema)