const mongoose = require('mongoose')
Schema = mongoose.Schema

const commentSchema = new Schema({
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true]
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: [true],
    },
    mainComment: {
        type: String,
        required: [true],
    }
},{timestamps : true});

module.exports = mongoose.model("Comment", commentSchema);