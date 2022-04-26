const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// const profanity = require('@2toad/profanity').profanity;

const { Profanity, ProfanityOptions } = require('@2toad/profanity');

const options = new ProfanityOptions();
options.wholeWord = false;
options.grawlix = '*****';

const profanity = new Profanity(options);

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Check if profanity exists in user name
    if (profanity.exists(name)) {
        name = profanity.censor(name)
    }


    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            img: user.img,
            email: user.email,
            token: generateToken(user._id),
            createdAt: user.createdAt,
            acceptedCookes: user.acceptedCookes,
            participatedIn: user.participatedIn,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc    Update user
// @route   PUT /api/users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    let { name, img } = req.body
    // const name = req.body.name
    const email = req.user.email

    // Check if profanity exists in user name
    if (profanity.exists(name)) {
        name = profanity.censor(name)
    }

    const acceptedCookies = true

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (!userExists) {
        res.status(400)
        throw new Error('User doesn\'t exist.')
    }
    if (!name) {
        name = req.user.name
    }
    if (!img) {
        img = req.user.img
    }
    // Hash password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // Update user
    User.findByIdAndUpdate(req.user._id.toString(), {
        img: img,
        name: name,
        acceptedCookies: true,
    }, function (err, user) {
        if (err) {
            res.status(400)
            throw new Error('Invalid user data')
        }
        else {
            res.status(201).json({
                _id: user.id,
                name: name,
                email: user.email,
                img: img,
                token: req.user,
                acceptedCookies: acceptedCookies,
            })
        }
    })


})

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })


    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            img: user.img,
            token: generateToken(user._id),
            createdAt: user.createdAt,
            acceptedCookies: user.acceptedCookies,
            participatedIn: user.participatedIn,
        })
    } else {
        res.status(400)
        throw new Error('Invalid credintials')
    }


})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // const {_id, name, email} = await User.findById(req.user.id)
    console.log(req.user)
    res.status(200).json(req.user)
})


const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = User.findById(req.params.id)
        await user.remove()
        res.status(200).json({ message: 'deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        throw new Error(error)
    }

})


const participate = asyncHandler(async (req, res) => {

    console.log(req.body)
    try {
        // const user = User.findById(req.body.id)
        User.findByIdAndUpdate(req.body.id.toString(), {
            participatedIn: 1,
        }, function (err, user) {
            if (err) {
                res.status(400)
                throw new Error('Invalid user data')
            }
            else {
                // console.log("Updated User : ", user, acceptedCookies);
                res.status(201).json({
                    message: "Great success"
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})


const getUser = asyncHandler(async (req, res) => {
    
    const id = req.params.id
    const viewing = await User.findById(id)
    console.log(viewing)
    if (viewing) {
        res.status(200).json(viewing)
    } else {
        throw new Error('bullshit')
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getMe,
    deleteUser,
    participate,
    getUser
}