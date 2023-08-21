const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: 'string',
        default: ''
    },
    description: {
        type: 'string',
        required: true
    }, 
    author: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
    }
}, {timestamps: true})

module.exports = mongoose.model('task', TaskSchema)