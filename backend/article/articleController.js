const Article = require('./Article')

getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).sort({date: -1}).limit(+req.params.amount)
        if (!articles) throw 'no articles found'
        res.json(articles)
    } catch (e) {
        res.status(400).json(e)
    }
}

getArticle = async (req, res) => {
    try {
        const article = await Article.findOne({_id: req.params.id})
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
        article.image = req.file.path
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

module.exports = {
    getArticles,
    createArticle,
    clapArticle,
    deleteArticle,
    getArticle
}