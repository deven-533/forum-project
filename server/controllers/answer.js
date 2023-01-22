const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const Comment = require('../models/Comment')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const getSingleAnswer = async (req, res) => {
    const singleAnswer = await Answer.findById(req.params.answerId)
    if (!singleAnswer) {
        throw new CustomError.NotFoundError(`No answer with id : ${req.params.answerId}`);
    }
    res.status(StatusCodes.OK).json({
        singleAnswer
    })
}

const createAnswer = async (req, res) => {
    const answer = await Answer.create({
        ...req.body, answeredBy: req.user.userId, questionId: req.params.id
    })
    res.status(StatusCodes.CREATED).json({
        answer
    })
}

const updateAnswer = async (req, res) => {
    const answer = await Answer.findByIdAndUpdate(req.params.answerId, req.body,
        {
            new: true,
            runValidators: true
        })
    if (!answer) {
        throw new CustomError.NotFoundError(`No answer with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({
        answer
    })
}

const deleteAnswer = async (req, res) => {
    const answer = await Answer.findByIdAndDelete(req.params.answerId)
    if (!answer) {
        throw new CustomError.NotFoundError(`No answer with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({
        msg: "Answer deleted"
    })
}

const upvoteAnswer = async (req, res) => {
    const answer = await Answer.findById(req.params.answerId)
    if (!answer) {
        throw new CustomError.NotFoundError(`No answer with id : ${req.params.answerId}`);
    }
    if (answer.upvotes.includes(req.user.userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: "You already upvoted this answer"
        })
    }
    answer.upvotes.push(req.user.userId)
    await answer.save()
    res.status(StatusCodes.OK).json({
        msg: "Answer upvoted",
        upvotesCount : answer.upvotes.length
    })
}

module.exports = {
    getSingleAnswer,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer
}