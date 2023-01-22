const {
    getAllQuestions,
    getSingleQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    commentOnQuestion,
    upvoteQuestion,
    getAllAnswers
} = require('../controllers/question')

const {
    getSingleAnswer,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer
} = require("../controllers/answer")

const express = require('express')
const router = express.Router()

router.route('/').get(getAllQuestions).post(createQuestion)
router.route('/:id').get(getSingleQuestion).put(updateQuestion).delete(deleteQuestion)
router.route('/:id/comment').post(commentOnQuestion)
router.route('/:id/upvote').post(upvoteQuestion)
router.route('/:id/answers').get(getAllAnswers).post(createAnswer)
router.route('/:id/answers/:answerId').get(getSingleAnswer).put(updateAnswer).delete(deleteAnswer).post(upvoteAnswer)

module.exports = router
