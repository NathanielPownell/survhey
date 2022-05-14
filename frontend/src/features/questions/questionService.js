import axios from 'axios'

const API_URL = '/api/questions/'

// Create Question
const createQuestion = async (questionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, questionData, config)

    return response.data
}
// update Question
const updateQuestion = async (questionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL, questionData, config)

    return response.data
}

// Get All Public Surveys
const getQuestionsBySurvey = async (id) => {
    const response = await axios.get(API_URL+ 'survey/' + id)
    return response.data
}

// Get User Surveys
const getMySurveys = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'user/' + id, config)

    return response.data
}

// Delete Question
const deleteQuestion = async (questionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + questionId, config)

    return response.data
}

const questionService = {
    createQuestion,
    getQuestionsBySurvey,
    getMySurveys,
    deleteQuestion,
    updateQuestion
}

export default questionService