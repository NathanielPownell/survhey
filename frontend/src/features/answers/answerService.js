import axios from 'axios'

const API_URL = '/api/answers/'

// Create Question
const createAnswer = async (answerData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, answerData, config)

    return response.data
}

// Get My Answers
const getMyAnswers = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}
// Get Answers By Survey
const getAnswersBySurvey = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL +'bysurvey/' + id,  config)

    return response.data
}

const questionService = {
    createAnswer,
    getMyAnswers,
    getAnswersBySurvey,
}

export default questionService