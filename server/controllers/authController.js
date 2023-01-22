const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken')
require('dotenv').config()


// const createJWT = () => {
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_LIFETIME,
//     });
//     return token;
// };

const register = async (req, res) => {

    const { email, name, username, password, about } = req.body
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    const user = await User.create({ name, email, username, password, about });
    // createToken user returns the parameters of the user to be used as payload while creating jwt token.
    // const tokenUser = createTokenUser(user);
    // // attachCookiesToResponse adds cookies to be sent with the response that consists of the token made using createjwt function and parameters required.
    // attachCookiesToResponse({ res, user: tokenUser });
    // console.log(res);
    // res.status(StatusCodes.CREATED).json({ user: tokenUser })

    const token = user.createJWT();
    // console.log(token);

    res.cookie('token', token, {
        httpOnly: true,
    })
    res.status(200).json({ user: user });

}

const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    // const isPasswordCorrect = req.body.password === user.password;
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    // console.log(res.cookie);
    res.status(StatusCodes.OK).json({ user: tokenUser });
    // const token = createJWT({ username: user.username, userId: user._id, name: user.name });

    // const oneDay = 1000 * 60 * 60 * 24;

    // console.log("adding cookies");
    // const token = user.createJWT();
    // console.log(token);


    // res.cookie('token', token)
    // res.status(200).json({ user: user, msg : "logged in successfully" });

    // console.log(res.cookie);

};

const logout = async (req, res) => {
    // res.cookie('token', 'logout', {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 1000),
    // });
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
    register, login, logout
}