const Article = require('./Article')

getArticles = async (req, res) => {
    try {
        const articles = await Article.find(req.query).sort({date: -1}).limit(+req.params.amount).populate('author')
        if (!articles) throw 'no articles found'
        res.json(articles)
    } catch (e) {
        res.status(400).json(e)
    }
}

getArticle = async (req, res) => {
    try {
        const article = await Article.findOne({_id: req.params.id}).populate('author')
        if (!article) throw 'no such article'
        res.json(article)
    } catch (e) {
        res.status(400).json(e)
    }
}

createArticle = async (req, res) => {
    const user = req.user
    try {
        const article = new Article(req.body)
        article.author = user._id
        if (req.file) article.image = req.file.path
        const createdArticle = await article.save()
        if (!createdArticle) throw createdArticle.json()
        res.json(createdArticle)
    } catch (e) {
        res.status(400).json(e)
    }
}

clapArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate({_id: req.params.id}, {$inc : {'claps' : 1}}, {new: true})
        if (!article) throw 'no such article'
        res.json(article.claps)
    } catch (e) {
        res.status(400).json(e)
    }
}

deleteArticle = async (req, res) => {
    const user = req.user
    try {
        const deleted = await Article.findOneAndDelete({_id: req.params.id, author: user._id})
        if (!deleted) throw 'no such article'
        res.json(deleted)
    } catch (e) {
        res.status(400).json(e)
    }
}

updateArticle = async (req, res) => {
    try {
        const article = await Article.findOne({_id: req.params.id, author: req.user._id})
        if (!article) throw 'no such article'
        if (req.file) article.image = req.file.path
        if (req.body.body) article.body = req.body.body
        if (req.body.header) article.header = req.body.header
        if (req.body.category) article.category = req.body.category
        if (req.body.introduction) article.introduction = req.body.introduction
        if (req.body.readingDuration) article.readingDuration = req.body.readingDuration
        const saved = await article.save()
        res.json(saved)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    getArticles,
    createArticle,
    clapArticle,
    deleteArticle,
    getArticle,
    updateArticle
}