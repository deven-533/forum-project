const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const CustomError = require('../errors');
const {
    createTokenUser,
    attachCookiesToResponse,
} = require('../utils');
const { StatusCodes } = require('http-status-codes');


// // localhost:3000/api/v1/users/
const getSingleUser = async (req, res) => {

    const user = await User.findOne({ _id: req.params.id })
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    const questions = await Question.find({ user: req.params.id })
    const answers = await Answer.find({ user: req.params.id })
    const { password, email, ...rest } = user._doc
    return res.status(StatusCodes.OK).json({ rest, questionCount: questions.length, answerCount: answers.length });

}

const getMyInfo = async (req, res) => {
    const user = await User
        .findOne({ username: req.user.username })
        .select('-password');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    const questions = await Question.find({ user: req.user.userId })
    const answers = await Answer.find({ user: req.user.userId })
    console.log(req.user);
    return res.status(StatusCodes.OK).json({ user, questionCount: questions.length, answerCount: answers.length });
};

const getAllQuestionsByUser = async (req, res) => {
    console.log(req.user);
    const questions = await Question.find({ askedBy: req.user.userId })
    if (!questions) {
        throw new CustomError.NotFoundError(`No questions by user with id : ${req.user.userId}`);
    }
    return res.status(StatusCodes.OK).json({ questions });
}

const getAllAnswersByUser = async (req, res) => {
    const answers = await Answer.find({ answeredBy: req.user.userId })
    if (!answers) {
        throw new CustomError.NotFoundError(`No answers by user with id : ${req.user.userId}`);
    }
}

const updateUser = async (req, res) => {
    const user = await User
        .findOne
        ({ username: req.user.username })
        .select('-password');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    const { name, email, about, username } = req.body;
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (about) {
        user.about = about;
    }
    if (username) {
        user.username = username;
    }
    await user.save();
    const token = createTokenUser(user);
    attachCookiesToResponse(res, token);
    return res.status(StatusCodes.OK).json({ user });
}

const updateUserPassword = async (req, res) => {
    const user = await User
        .findOne
        ({ username: req.user.username })
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    const { oldPassword, newPassword } = req.body;
    if (oldPassword && newPassword) {
        if (oldPassword === newPassword) {
            throw new CustomError.BadRequestError('Old password and new password cannot be same');
        }
        const isPasswordValid = await user.comparePassword(oldPassword);
        if (!isPasswordValid) {
            throw new CustomError.BadRequestError('Old password is not correct');
        }
        user.password = newPassword;
        await user.save();
        return res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
    }
    throw new CustomError.BadRequestError('Please provide old password and new password');
}

const followUser = async (req, res) => {
    const { userId: followerId } = req.user
    const { id: followingId } = req.params
    const followeruser = await User.findById(followerId)
    const followinguser = await User.findById(followingId)
    if (!followinguser) {
        throw new CustomError.NotFoundError(`No user with id ${followingId}`)
    }
    if (followeruser.following.includes(followingId)) {
        // return res.status(400).json('You are already following this user.')
        throw new CustomError.BadRequestError(`You already follow ${followinguser.username}`)
    }
    followeruser.following.push(followingId)
    followinguser.followers.push(followerId)
    await followeruser.save()
    await followinguser.save()
    res.status(StatusCodes.OK).json(`You are now following ${followinguser.username}`)
}

const unFollowUser = async (req, res) => {
    // res.send('unfollow user')
    const { userId: followerId } = req.user
    const { id: followingId } = req.params
    const followeruser = await User.findById(followerId)
    const followinguser = await User.findById(followingId)
    if (!followeruser || !followinguser) {
        throw new CustomError.NotFoundError(`No user with id ${followingId}`)
    }
    if (!followeruser.following.includes(followingId)) {
        throw new CustomError.BadRequestError(`You do not follow ${followinguser.username}`)
    }
    followeruser.following = followeruser.following.filter(following => following != followingId)
    followinguser.followers = followinguser.followers.filter(follower => follower != followerId)
    await followeruser.save()
    await followinguser.save()
    res.status(200).json(`You are no longer following ${followinguser.username}`)
}

const getAllFollowers = async (req, res) => {
    const { id } = req.params
    const user = await User
        .findById(id)
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`)
    }
    const followers = await Promise.all(
        user.followers.map(async followerId => {
            const follower = await User.findById(followerId)
            const { password, email, ...rest } = following._doc
            return rest
        }))
    res.status(200).json(followers)
}

const getAllFollowing = async (req, res) => {
    const { id } = req.params
    const user = await User
        .findById(id)
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`)
    }
    const following = await Promise.all(
        user.following.map(async followingId => {
            const following = await User.findById(followingId)
            const { password, email, ...rest } = following._doc
            return rest
        }))
    res.status(200).json(following)
}

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) {
        throw new CustomError.NotFoundError(`No users found`);
    }
    return res.status(StatusCodes.OK).json({ users });
}




module.exports = {
    getMyInfo,
    getSingleUser,
    getAllQuestionsByUser,
    getAllAnswersByUser,
    updateUser,
    updateUserPassword,
    followUser, unFollowUser,
    getAllFollowers, getAllFollowing, getAllUsers
}
