import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import answerService from './answerService'


const initialState = {
    answers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const otherState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}




// Create new answer
export const createAnswer = createAsyncThunk('answers/create', async (answerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await answerService.createAnswer(answerData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all answers to a survey
export const getAnswersBySurvey = createAsyncThunk('answers/getbysurvey/:id', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await answerService.getAnswersBySurvey(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get My Answers
export const getMyAnswers = createAsyncThunk('answers/getmine', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await answerService.getMyAnswers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all answers via question
export const getAnswersByQuestion = createAsyncThunk('answers/getbyquestion/:id', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await answerService.getAnswersByQuestion(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const answerSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAnswer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAnswer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.answers.push(action.payload)
            })
            .addCase(createAnswer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMyAnswers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyAnswers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.answers = action.payload
            })
            .addCase(getMyAnswers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAnswersBySurvey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAnswersBySurvey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.answers = action.payload
            })
            .addCase(getAnswersBySurvey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const { reset } = answerSlice.actions
export default answerSlice.reducer