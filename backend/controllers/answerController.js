const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Answer = require('../models/answerModel')
const { Profanity, ProfanityOptions } = require('@2toad/profanity');
const User = require('../models/userModel')
const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = '*****';

const profanity = new Profanity(options);

// @desc    Get answers via question
// @route   GET /api/answers/:id
// @access  Public
const getAnswerByQuestion = asyncHandler(async (req, res) => {
    const answers = await Answer.find({ question: req.params.id })
    res.status(200).json(answers)
})

// @desc    Get logged in users answers
// @route   GET api/questions/me
// @access  Private
const getMyAnswers = asyncHandler(async (req, res) => {
    const answers = await Answer.find({ user: req.user.id })
    res.status(200).json(answers)
})
// @desc    Get answers via survey
// @route   GET /api/questions
// @access  Public
const getAnswersBySurvey = asyncHandler(async (req, res) => {
    let answers = await Answer.find({ survey: req.params.id })


    res.status(200).json(answers)
})


// @desc    Delete answer
// @route   DELETE /api/questions/:id
// @access  Private
const deleteAnswer = asyncHandler(async (req, res) => {
    await Answer.deleteOne({ _id: req.answer.id })
    res.status(200).json({ id: req.answer.id })
})


// @desc    Create new answer
// @route   POST /api/answers
// @access  Private
const createAnswer = asyncHandler(async (req, res) => {
    let { survey, question, body } = req.body

    if (!survey || !question || !body) {
        console.log(survey, question, body)
        res.status(400)
        throw new Error('Please add all fields.')
    }

    if (profanity.exists(body)) {
        body = profanity.censor(body)
    }

    // Create question
    const answer = await Answer.create({
        survey,
        question,
        user: req.user.id,
        body,
        username: req.user.name,
        userimage: req.user.img,
    })

    if (answer) {
        res.status(201).json({
            _id: answer.id,
            text: answer.body,
            // type: answer.type,
        })
    } else {
        res.status(400)
        throw new Error('Invalid answer data')
    }

})

// @desc    Update Answer
// @route   PUT /api/answers/:id
// @access  Private
const updateAnswer = asyncHandler(async (req, res) => {
    const { survey, body } = req.body

    if (!body || !survey) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    const answer = await Answer.updateOne({
        body,
    })

    if (answer) {
        res.status(201).json({
            _id: answer.id,
            text: answer.text,
        })
    } else {
        res.status(400)
        throw new Error('Invalid answer data')
    }

})


module.exports = {
    getAnswerByQuestion,
    getAnswersBySurvey,
    deleteAnswer,
    createAnswer,
    updateAnswer,
    getMyAnswers
}