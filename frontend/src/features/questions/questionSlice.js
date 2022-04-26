import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import questionService from './questionService'


const initialState = {
    questions: [],
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




// Create new question
export const createQuestion = createAsyncThunk('questions/create', async (questionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await questionService.createQuestion(questionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update new question
export const updateQuestion = createAsyncThunk('questions/update', async (questionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await questionService.updateQuestion(questionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all public surveys
export const getQuestionsBySurvey = createAsyncThunk('questions/getbysurvey/:id', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await questionService.getQuestionsBySurvey(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user surveys
// export const getMySurveys = createAsyncThunk('surveys/user/', async (_, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         const userId = thunkAPI.getState().auth.user._id
//         return await surveyService.getMySurveys(userId, token)
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// Delete question
export const deleteQuestion = createAsyncThunk('questions/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await questionService.deleteQuestion(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuestion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions.push(action.payload)
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateQuestion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions.push(action.payload)
                state.questions = state.questions.filter(
                    (question) => question._id !== action.payload.id
                )
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getQuestionsBySurvey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuestionsBySurvey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions = action.payload
            })
            .addCase(getQuestionsBySurvey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // .addCase(getAllSurveys.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(getAllSurveys.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.surveys = action.payload
            // })
            // .addCase(getAllSurveys.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
            .addCase(deleteQuestion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions = state.questions.filter(
                    (question) => question._id !== action.payload.id
                )
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = questionSlice.actions
export default questionSlice.reducer