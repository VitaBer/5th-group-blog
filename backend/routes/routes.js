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

// articles
router.get('/article/amount=:amount', ArticleController.getArticles)
router.post('/article/create', UserAuth, ArticleController.createArticle)
router.post('/article/clap/:id', UserAuth, ArticleController.clapArticle)


// users
router.post('/user/signup', UserController.signUp)
router.post('/user/login', UserController.logIn)
router.post('/user/logout', UserAuth, UserController.logOut)
router.patch('/user/changeProfilePic', UserAuth, UserController.changeProfilePic)

// upload files
router.post('/upload', upload.single('test'), (req, res, next) => {
    res.send(req.file)
})

module.exports = router