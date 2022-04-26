const express = require('express');
const router = express.Router()
const {
    getQuestions,
    getQuestion,
    deleteQuestion,
    createQuestion,
    updateQuestion,
    getQuestionsBySurvey,
} = require('../controllers/questionController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getQuestions).put(protect, updateQuestion).post(protect, createQuestion)
router.route('/:id').get(getQuestion).delete(protect, deleteQuestion)
router.route('/survey/:id').get(getQuestionsBySurvey)
// router.route('/:id').get(getUserSurveys)

module.exports = router