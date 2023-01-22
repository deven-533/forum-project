const mongoose = require('mongoose')
Schema = mongoose.Schema
// const validator = require('validator')

const questionSchema = new Schema({
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true]
    },
    mainQuestion: {
        type: String,
        required: [true, 'Please provide a question.']
    },
    upvotes: {
        type: Array,
        default: [],
    },
    title :{
        required : true,
        type : String,
    },
    // downvotes: {
    //     type: Array,
    //     default: [],
    // },
    tags: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

