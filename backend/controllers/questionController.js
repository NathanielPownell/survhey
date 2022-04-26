const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')
const Answer = require('../models/answerModel')
const { Profanity, ProfanityOptions } = require('@2toad/profanity');

const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = '*****';

const profanity = new Profanity(options);

// @desc    Get questions via survey
// @route   GET /api/questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find({ survey: req.body.survey })
    console.log(req.body.survey)
    res.status(200).json(questions)
})


// @desc    Get questions via survey
// @route   GET /api/questions
// @access  Public
const getQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findOne({ _id: req.params.id })
    res.status(200).json(question)
})

const getQuestionsBySurvey = asyncHandler(async (req, res) => {
    const questions = await Question.find({ survey: req.params.id })
    res.status(200).json(questions)
})

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    await Question.deleteOne({ _id: req.params.id })
    await Answer.deleteMany({ question: req.params.id })

    res.status(200).json({ id: req.params.id })
})


// @desc    Create new survey
// @route   POST /api/surveys
// @access  Private
const createQuestion = asyncHandler(async (req, res) => {
    let { survey, text, type, choices } = req.body

    if (!survey || !text) {
        res.status(400)
        console.log(survey, text, type, choices)
        throw new Error('Please add all fields.')
    }

    if(profanity.exists(text)) {
        text = profanity.censor(text)
    }

    // if(choices){
    //     choices.forEach(function (choice, index) {
    //         const newChoice = profanity.censor(choice)

    //         choices.remove(index)
    //         choices.push(newChoice)
    //         console.log(newChoice)
    //     })
    // }

    if (type < 0 || type > 9) {
        res.status(400)
        throw new Error('Please choose a valid type')
    }
    if (type == 1) {

        if (!choices) {
            res.status(400)
            throw new Error('Please add choices to your multiple choice question.')
        }
    }

    // Create question
    const question = await Question.create({
        survey,
        text,
        type,
        choices,
    })



    if (question) {
        res.status(201).json({
            _id: question.id,
            text: question.text,
            type: question.type,
            choices: question.type == 1 ? question.choices : null,
        })
    } else {
        res.status(400)
        throw new Error('Invalid question data')
    }

})

// @desc    Update Question
// @route   PUT /api/questions/:id
// @access  Private
const updateQuestion = asyncHandler(async (req, res) => {
    let { id, survey, text, type } = req.body
    if (!text || !survey) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    if(profanity.exists(text)) {
        text = profanity.censor(text)
    }
    // Update question
    await Question.findByIdAndUpdate(id, {
        id,
        survey,
        text,
        type,
    }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
            // res.status(201).json({
            //     _id: id,
            //     text: text,
            //     type: type,
            //     choices: question.choices,
            // })
            // const question = Question.findById(id)
        
            // if (question) {
            //     console.log("oorah")
            //     res.status(201).json({
            //         _id: id,
            //         text: text,
            //         type: type,
            //         choices: question.choices,
            //     })
            // }
        }

    })

})
module.exports = {
    getQuestions,
    getQuestion,
    deleteQuestion,
    createQuestion,
    updateQuestion,
    getQuestionsBySurvey
}
