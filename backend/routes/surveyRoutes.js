const express = require('express');
const router = express.Router()
const {
    getAllSurveys,
    getUserSurveys,
    createSurvey,
    updateSurvey,
    getSurvey,
    deleteSurvey
} = require('../controllers/surveyController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllSurveys).post(protect, createSurvey).put(protect, updateSurvey)
router.route('/:id').get(getSurvey).delete(protect, deleteSurvey).put(protect, updateSurvey)
router.route('/user/:id').get(getUserSurveys)

module.exports = router