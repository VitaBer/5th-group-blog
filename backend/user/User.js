const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: [3, 'username must be at least 3 chars long']
    },
    password: {
        type: String,
        required: true,
        min: [5, 'password must be at least 5 chars long']
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'invalid email'],
        unique: true
    },
    profileImgURL: String,
    tokens: [{
        token: String
    }]
})

UserSchema.pre('save', function(next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else next()
})

const User = mongoose.model('user', UserSchema)

module.exports = User