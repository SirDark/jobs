const BadRequestError = require("../errors/bad-request")
const UnauthenticatedError = require("../errors/unauthenticated")
const User = require("../models/User")
const {StatusCodes} = require('http-status-codes')

const register = async (req,res) =>{
    const newUser = await User.create({...req.body})
    const token = newUser.createJWTSign()
    res.status(StatusCodes.CREATED).json({user:{name:newUser.name}, token:token})
}

const login = async (req,res) =>{
    //input validation
    const {email, password} = req.body
    if (!email || !password)
        throw new BadRequestError('please provide email and password')
    //look up user
    const user = await User.findOne({email})
    if(!user)
        throw new UnauthenticatedError('Invalid credentials')
    //password validdation
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect)
        throw new UnauthenticatedError('Invalid credentials')
    const token = user.createJWTSign()
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
}

module.exports ={
    register,
    login
}