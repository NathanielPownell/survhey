const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    updateUser,
    getMe,
    deleteUser, 
    participate,
    getUser
} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


router.post('/', registerUser)
router.put('/', protect, updateUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.delete('/:id', protect, deleteUser)
router.put('/participate', participate)
router.get('/:id', getUser)

module.exports = router