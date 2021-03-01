const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    }
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment