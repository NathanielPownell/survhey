import axios from 'axios'

const API_URL = '/api/surveys/'

// Create Survey
const createSurvey = async (surveyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, surveyData, config)

    return response.data
}

// Update Survey
const updateSurvey = async (surveyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL, surveyData, config)

    return response.data
}

// Get All Public Surveys
const getAllSurveys = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
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

// Get survey via ID
const getSurvey = async (id) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

// Delete Survey
const deleteSurvey = async (surveyId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + surveyId, config)

    return response.data
}

const surveyService = {
    createSurvey,
    getAllSurveys,
    updateSurvey,
    getMySurveys,
    getSurvey,
    deleteSurvey
}

export default surveyService