const {
    getMyInfo,
    getSingleUser,
    getAllQuestionsByUser,
    getAllAnswersByUser,
    updateUser,
    updateUserPassword,
    followUser, unFollowUser,
    getAllFollowers, getAllFollowing, getAllUsers
} = require("../controllers/user");

// const {

//     authorizePermissions,
// } = require('../middleware/authentication');

const express = require('express')
const router = express.Router()

router.route('/').get(getMyInfo).put(updateUser).patch(updateUserPassword)
router.route('/:id').get(getSingleUser)
router.route('/questions').get(getAllQuestionsByUser)
router.route('/answers').get(getAllAnswersByUser)
router.route('/follow/:id').post(followUser)
router.route('/unfollow/:id').post(unFollowUser)
router.route('/followers/:id').get(getAllFollowers)
router.route('/following/:id').get(getAllFollowing)

router.route('/all').get(getAllUsers)

module.exports = router
