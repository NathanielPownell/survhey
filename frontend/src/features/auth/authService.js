import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Update user
const updateUser = async (userData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    console.log("THIS IS USER DATA: ", userData)
    const response = await axios.put(API_URL, userData, config)

    console.log(response)
    if (response.data) {
        // localStorage.setItem('user', JSON.stringify(response.data))
        console.log("response.data", response.data)
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const deleteUser = async (id, token) => {
    console.log("not workin")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    const response = await axios.delete(API_URL + id, config)
    if (response.data) {
        localStorage.removeItem('user')
    }
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

// get user get participation
const participate = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.put(API_URL + 'participate', id, config)

    return response.data
}

// get user
const getUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + id, config)
    return response
}

const authService = {
    register,
    updateUser,
    logout,
    login,
    deleteUser,
    participate,
    getUser
}

export default authService