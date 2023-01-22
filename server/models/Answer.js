const mongoose = require('mongoose')
Schema = mongoose.Schema


const answerSchema = new Schema({
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true]
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: [true]
    },
    upvotes: {
        type: Array,
        default: []

    },
    // downvotes:{
    //     type:Number,
    //     default:0
    // },
    answer: {
        type: String,
        required: [true, 'Please provide an answer.']
    }
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);