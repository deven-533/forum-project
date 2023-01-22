const {
    getSingleAnswer,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer
} = require("../controllers/answer")

const express = require('express')
const router = express.Router()

router.route('/').get(getSingleAnswer).post(createAnswer).put(updateAnswer).delete(deleteAnswer).patch(upvoteAnswer)

module.exports = router