const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Survey = require('../models/surveyModel')
const User = require('../models/userModel')
const answerModel = require('../models/answerModel')
const questionModel = require('../models/questionModel')

const { Profanity, ProfanityOptions } = require('@2toad/profanity');

const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = '*****';

const profanity = new Profanity(options);

// @desc    Get surveys
// @route   GET /api/surveys
// @access  Public
const getAllSurveys = asyncHandler(async (req, res) => {
    const surveys = await Survey.find({ public: true }).limit(20)

    res.status(200).json(surveys)
})

// @desc    Get surveys
// @route   GET /api/surveys/:id
// @access  Public
const getSurvey = asyncHandler(async (req, res) => {
    let survey = await Survey.findById(req.params.id)
    const surveyOwner = await User.findById(survey.user.toString())
    const responseData = {
        ...survey,
        userImg: surveyOwner.img,
        userName: surveyOwner.name,
    }
    res.status(200).json(responseData)
})

// @desc    Get surveys via user
// @route   GET /api/surveys/user/:id
// @access  Private
const getUserSurveys = asyncHandler(async (req, res) => {
    const surveys = await Survey.find({ user: req.params.id })
    res.status(200).json(surveys)
})


// @desc    Create new survey
// @route   POST /api/surveys
// @access  Private
const createSurvey = asyncHandler(async (req, res) => {
    let { title, public, description, enableanon, color } = req.body

    if (!title) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    if(profanity.exists(title)) {
        title = profanity.censor(title)
    }
    if(profanity.exists(description)) {
        description = profanity.censor(description)
    }

    // Create survey
    const survey = await Survey.create({
        title,
        user: req.user.id.toString(),
        public,
        description,
        enableanon,
        color,
    })


    if (survey) {
        res.status(201).json({
            _id: survey.id,
            title: survey.title,
            user: survey.user,
            public: survey.public,
            description: survey.description,
            enableanon: survey.enableanon,
            color: survey.color
        })
    } else {
        res.status(400)
        throw new Error('Invalid survey data')
    }

})

// @desc    Update Survey
// @route   POST /api/surveys/:id
// @access  Private
const updateSurvey = asyncHandler(async (req, res) => {
    let { survey, title, public, description, enableanon, color } = req.body
    const user = req.user.id


    if (!title || !user) {
        res.status(400)
        console.log('add all fields')
        throw new Error('Please add all fields.')
    }

    if(profanity.exists(title)) {
        title = profanity.censor(title)
    }
    if(profanity.exists(description)) {
        description = profanity.censor(description)
    }

    // const updateSurvey = Survey.findOne(survey)

    await Survey.findByIdAndUpdate(survey, {
        id: survey,
        title: title,
        user: req.user.id,
        public: public,
        description: description,
        enableanon: enableanon,
        color: color
    }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("Updated Survey : ", docs)
        }
    }).clone()

})



// @desc    Delete a survey
// @route   DELETE /api/surveys/:id
// @access  Private
const deleteSurvey = asyncHandler(async (req, res) => {
    const survey = await Survey.findById(req.params.id)

    if (!survey) {
        res.status(400)
        throw new Error('Survey not found')
    }

    // const user = await User.findById(req.user.id)

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check user is owner of goal
    if (survey.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await answerModel.deleteMany({ survey: survey.id })
    await questionModel.deleteMany({ survey: survey.id })
    await survey.remove()

    res.status(200).json({ id: req.params.id })
})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    getAllSurveys,
    getUserSurveys,
    createSurvey,
    updateSurvey,
    getSurvey,
    deleteSurvey
}