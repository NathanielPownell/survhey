import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import surveyService from './surveyService'


const initialState = {
    surveys: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new survey
export const createSurvey = createAsyncThunk('surveys/create', async (surveyData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await surveyService.createSurvey(surveyData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Survey
export const updateSurvey = createAsyncThunk('surveys/update', async (surveyData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await surveyService.updateSurvey(surveyData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all public surveys
export const getAllSurveys = createAsyncThunk('surveys/', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await surveyService.getAllSurveys(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user surveys
export const getMySurveys = createAsyncThunk('surveys/mine/', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const userId = thunkAPI.getState().auth.user._id
        return await surveyService.getMySurveys(userId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user surveys by id
export const getUserSurveys = createAsyncThunk('surveys/user/', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        // const userId = thunkAPI.getState().auth.user._id
        return await surveyService.getMySurveys(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user survey
export const deleteSurvey = createAsyncThunk('surveys/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await surveyService.deleteSurvey(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSurvey = createAsyncThunk('surveys/getOne', async (id, thunkAPI) => {
    try {
        return await surveyService.getSurvey(id, thunkAPI)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const surveySlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {
        reset: (state) => {
            state.surveys = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSurvey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSurvey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = action.payload
            })
            .addCase(createSurvey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateSurvey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateSurvey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = action.payload
            })
            .addCase(updateSurvey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMySurveys.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMySurveys.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = action.payload
            })
            .addCase(getMySurveys.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllSurveys.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllSurveys.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = action.payload
            })
            .addCase(getAllSurveys.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserSurveys.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserSurveys.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = action.payload
            })
            .addCase(getUserSurveys.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSurvey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSurvey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = action.payload._doc
                state.surveys.owner = action.payload.userName
                state.surveys.ownerImg = action.payload.userImg
                // state.questions = action.payload.questions
            })
            .addCase(getSurvey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteSurvey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteSurvey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.surveys = state.surveys.filter(
                    (survey) => survey._id !== action.payload.id
                )
            })
            .addCase(deleteSurvey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = surveySlice.actions
export default surveySlice.reducer