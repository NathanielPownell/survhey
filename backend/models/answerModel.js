const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Survey'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    body: {
        type: String,
        required: [true, 'Please add answer body.']

    },
    username: {
        type: String,
    },
    userimage: {
        type: String,
    }


},
    {
        timestamps: true
    })

module.exports = mongoose.model('Answer', answerSchema)