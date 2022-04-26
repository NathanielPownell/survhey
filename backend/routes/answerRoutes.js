const express = require('express');
const router = express.Router()
const {
    getAnswerByQuestion,
    getAnswersBySurvey,
    deleteAnswer,
    createAnswer,
    updateAnswer,
    getMyAnswers
} = require('../controllers/answerController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createAnswer).get(protect, getMyAnswers)
router.route('/:id').get(getAnswerByQuestion).delete(protect, deleteAnswer).put(protect, updateAnswer)
router.route('/bysurvey/:id').get(protect, getAnswersBySurvey)
// router.route('/:id').get(getUserSurveys)

module.exports = router