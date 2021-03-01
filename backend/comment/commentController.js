const Comment = require('./Comment')

createComment = async (req, res) => {
    const user = req.user
    try {
        const comment = new Comment(req.body)
        comment.author = user._id
        const created = await comment.save()
        if (!created) throw created.json()
        res.json(created)
    } catch (e) {
        res.status(400).json(e)
    }
}

getComments = async (req, res) => {
    try {
        const comments = await Comment.find({article: req.body.articleId}).populate('likes')
        if (!comments) throw 'no comments found'
        res.json(comments)
    } catch (e) {
        res.status(400).json(e)
    }
}

likeComment = async (req, res) => {
    try {
        const likedComment = await Comment.findOne({_id: req.body._id})
        if (!likedComment) throw 'no such comment'
        console.log(likedComment)
        likedComment.likes.push(req.user._id)
        const saved = await likedComment.save()
        if (!saved) throw 'something went wrong'
        res.json(saved)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    createComment,
    getComments,
    likeComment
}