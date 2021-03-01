const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage})

const UserController = require('../user/userController')
const UserAuth = require('../user/auth')
const ArticleController = require('../article/articleController')
const CommentController = require('../comment/commentController')

// test
router.get('/', (req, res) => {
    res.send('veikia')
})

// articles
router.get('/article/amount=:amount', ArticleController.getArticles)
router.post('/article/create', UserAuth, upload.single('articleImg'), ArticleController.createArticle)
router.post('/article/clap/:id', UserAuth, ArticleController.clapArticle)
router.delete('/article/delete/:id', UserAuth, ArticleController.deleteArticle)
router.get('/article/:id', ArticleController.getArticle)

// comments
router.post('/comment/create', UserAuth, CommentController.createComment)
router.post('/comment/getcomments', CommentController.getComments)
router.post('/comment/like', UserAuth, CommentController.likeComment)

// users
router.post('/user/signup', upload.single('profileImg'), UserController.signUp)
router.post('/user/login', UserController.logIn)
router.post('/user/logout', UserAuth, UserController.logOut)
router.patch('/user/changeProfilePic', UserAuth, upload.single('profileImg'), UserController.changeProfilePic)

module.exports = router