const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Survey'
    },
    text: {
        type: String,
        required: [true, 'Please add a question.']
    },
    // Question type determines the feedback to be received from end user answering question.
    // Type also determines whether or not there will be 'choices' included in question. I.E. If the question
    // is a multiple choice, we require input of choices.
    type: {
        type: Number,
        required: [true, 'Please choose question type.'],
        default: 0
    },
    choices: {
        type: Array,
        required: false
    }
    }, {
    timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)