const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const {checkPasswordReq, emailIsValid} = require("../middleware/registerationMiddleware")

// desc: Register new user
// route: POST /api/users
// access: Public
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }

    // checking if password fits requirements
    if(!checkPasswordReq(password)) {
        res.status(400)
        throw new Error("Password must be at least 8 characters long and include one digit")

    }

    // checking if email is valid
    if(!emailIsValid(email)) {
        res.status(400)
        throw new Error("Invalid email")
    }

    // Checking if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creat User
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            message: "User succesfully registered!",
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// desc: Register new user
// route: POST /api/users/login
// access: Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            message: "Login User",
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})

// desc: Get user data
// route: GET /api/users/me
// access: Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, firstName, lastName, email, role} = await User.findById(req.user.id) //set in middleware

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email,
        role
    })
})

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "9999d" // pretty much never expires, so the user never gets logged out
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}