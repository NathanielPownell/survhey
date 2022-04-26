const mongoose = require('mongoose')

const surveySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    public: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: [true, 'Please add a survey description.']
    },
    enableanon: {
        type: Boolean,
        default: true
    },
    color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Survey', surveySchema)