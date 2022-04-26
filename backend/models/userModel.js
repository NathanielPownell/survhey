const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    img: {
        type: String,
        default: "https://res.cloudinary.com/dzflw4umy/image/upload/v1649937490/android-chrome-512x512_vnnwfu.png"
    },
    acceptedCookies: {
        type: Boolean,
        required: true,
        default: false
    },
    participatedIn: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)

