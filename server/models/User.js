const mongoose = require('mongoose')
Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        required: [true, 'Please provide name.'],
        type: String,
        max: 20
    },
    username: {
        required: [true, 'Please provide Username'],
        type: String,
        unique: [true, 'Username already taken.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        min: 6,
    },
    // role: {
    //     type: String,
    //     enum: ['admin', 'user'],
    //     default: 'user',
    // },
    totalUpvotes: {
        type: Array,
        default: [],
    },
    about: {
        type: String,
        max: 500,
        default: ''
    },
    // bookmarks : {
    //     type : Array,
    //     default : [],
    // }
    // profilePicture : {
    //     type: String,
    // }
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name, username :this.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}


module.exports = mongoose.model('User', userSchema);