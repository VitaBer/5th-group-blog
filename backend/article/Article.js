const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    claps: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    },
    introduction: String,
    readingDuration: {
        type: Number,
        min: [1, 'reading length must be at least 1']
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    category: {
        type: String,
        required: true
    }
})

const Article = mongoose.model('article', ArticleSchema)

module.exports = Article