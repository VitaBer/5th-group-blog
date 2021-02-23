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
    author: mongoose.Schema.Types.ObjectId,
    claps: Number,
    date: Date,
    comments: [{}]
})

const Article = mongoose.model('article', ArticleSchema)

module.exports = Article