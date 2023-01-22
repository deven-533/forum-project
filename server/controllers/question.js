const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const Comment = require('../models/Comment')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllQuestions = async (req, res) => {
    const questions = await Question.find()
    const count = questions.length;
    res.status(StatusCodes.OK).json({
        count,
        questions
    })
}

const getSingleQuestion = async (req, res) => {
    const singleQuestion= await Question.findById(req.params.id)
    if(!singleQuestion){
        throw new CustomError.NotFoundError(`No question with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({
        singleQuestion
    })
}


const createQuestion = async (req, res) => {
    const question = await Question.create({
        ...req.body, askedBy: req.user.userId
    })
    res.status(StatusCodes.CREATED).json({
        question
    })
}

const updateQuestion = async (req, res) => {
    const question = await Question.findByIdAndUpdate(req.params.id, {...req.body, askedBy : req.user.userId}, 
        {
            new: true,
            runValidators: true
        })
    if (!question) {
        throw new CustomError.NotFoundError(`No question with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({
        question
    })
}   

const deleteQuestion = async (req, res) => {
    const question = await Question.findByIdAndDelete(req.params.id)
    if (!question) {
        throw new CustomError.NotFoundError(`No question with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({
        msg : "Question deleted"
    })
}

const commentOnQuestion = async (req, res) => {
    const comment = await Comment.create({...req.body, commentedBy: req.user.userId, questionId: req.params.id})
    res.status(StatusCodes.CREATED).json({
        comment
    })
}

const upvoteQuestion = async (req, res) => {
    const question = await Question.findById(req.params.id)
    if (!question) {
        throw new CustomError.NotFoundError(`No question with id : ${req.params.id}`);
    }
    if (question.upvotes.includes(req.user.userId)) {
        return res.status(StatusCodes.OK).json({
            msg: "You have already upvoted this question"
        })
    }
    question.upvotes.push(req.user.userId)
    await question.save()
    res.status(StatusCodes.OK).json({
        msg: "Question upvoted"
    })
}

const getAllAnswers = async (req, res) => {
    const answers = await Answer.find({questionId: req.params.id})
    const count = answers.length;
    res.status(StatusCodes.OK).json({
        count,
        answers
    })
}

module.exports = {
    getAllQuestions,
    getSingleQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    commentOnQuestion,
    upvoteQuestion,
    getAllAnswers
}


// const getAllQuestions = async (req, res) => {
//     const questions= await Question.find()
//     if(questions){
//         res.status(200).json(questions);
//     }
//     else{
//         res.send("No questions found");
//     }
// }

// const getSingleQuestion = async (req, res) => {
//     const singleQuestion= await Question.findById(req.params.id)
//     if(singleQuestion){
//         res.status(200).json(singleQuestion);
//     }
//     else{
//         res.send("No question found");
//     }
// }

// const createQuestion = async (req, res) => {
   
//     const createQuestion = new Question({
//         question: req.body.question,
//         askedBy: req.user.id
//     })
//     try {
//         const newQuestion = await createQuestion.save()
//         res.status(201).json(newQuestion)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
    
// }

// const updateQuestion = async (req, res) => {
//     const updateQuestion= await Question.findByIdAndUpdate(req.params.id,{mainQuestion:req.body.mainQuestion},{new:true})
//     if(updateQuestion){
//         res.status(200).json(updateQuestion);
//     }
//     else{
//         res.send("No question found");
//     }
// }   

// const deleteQuestion = async (req, res) => {
//     const deleteQuestion= await Question.findByIdAndDelete(req.params.id)
//     if(deleteQuestion){
//         res.status(200).json(deleteQuestion);
//     }
//     else{
//         res.send("No question found");
//     }
// }

// const commentOnQuestion = async (req, res) => {
//     res.send("Comment on question")
// }

// const upvoteQuestion = async (req, res) => {
    
// }

// const getAllAnswers = async (req, res) => {
//     res.send("All answers on this question")
// }

// module.exports = {
//     getAllQuestions,
//     getSingleQuestion,
//     createQuestion,
//     updateQuestion,
//     deleteQuestion,
//     commentOnQuestion,
//     upvoteQuestion,
//     getAllAnswers
// }