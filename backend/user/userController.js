const User = require('./User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

signUp = async (req, res) => {
    try {
        const user = new User(req.body)
        user.profileImgURL = req.file.path
        const createdUser = await user.save()
        res.json(createdUser)
    } catch (e) {
        res.status(400).json(e)
    }
}

logIn = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) throw 'no user found'

        const confirm = await bcrypt.compare(req.body.password, user.password)

        const token = jwt.sign({ _id: user._id.toHexString() }, process.env.SECRET)
        user.tokens.push({token})

        await user.save()

        if (confirm) res.header('token', token).json(user)
        if (!confirm) throw 'wrong password'
    } catch (e) {
        res.status(401).json(e)
    }
}

logOut = async (req, res) => {
    const token = req.token
    const user = req.user
    try {
        await user.update({
            $pull : {
                tokens: {
                    token
                }
            }
        })
        res.json('successful logout')
    } catch (e) {
        res.status(400).json(e)
    }
}

changeProfilePic = async (req, res) => {
    const user = req.user
    const newProfilePic = req.file.path
    try {
        const updated = await User.findOneAndUpdate({_id: user._id}, {profileImgURL: newProfilePic}, {new: true})
        if (!updated) throw updated.json()
        res.json(updated)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    signUp,
    logIn,
    logOut,
    changeProfilePic
}