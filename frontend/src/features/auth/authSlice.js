import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// Update user
export const updateUser = createAsyncThunk('auth/update', async (data, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateUser(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
    }
)

export const deleteUser = createAsyncThunk('auth/delete', async (id, thunkAPI) => {
    
    try {
        const token = thunkAPI.getState().auth.user.token
        // const id = thunkAPI.getState().auth.user._id
        console.log(id)
        return await authService.deleteUser(id, token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

export const participate = createAsyncThunk('auth/participate', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        // const id = thunkAPI.getState().auth.user._id
        // console.log(id)
        const user = { "id": thunkAPI.getState().auth.user._id}
        return await authService.participate(user, token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUser = createAsyncThunk('auth/user/:id', async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    try {
        return await authService.getUser(id, token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserNameImage = createAsyncThunk('auth/userdetails/:id', async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    try {
        return await authService.getUser(id, token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.img = action.payload.img
                state.user.name = action.payload.name
                state.user.acceptedCookies = action.payload.acceptedCookies
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })
            .addCase(participate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(participate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.participatedIn = state.user.participatedIn + 1
            })
            .addCase(participate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.viewing = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })
            .addCase(getUserNameImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserNameImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.viewing = action.payload
            })
            .addCase(getUserNameImage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer