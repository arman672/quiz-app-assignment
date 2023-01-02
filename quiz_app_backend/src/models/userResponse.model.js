const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const userResponseSchema = new mongoose.Schema({
    emailId:{
        type: String,
        required: true
    },
    quizHash: {
        type: String,
        required: true
    },
    questionId:{
        type: objectId,
        ref: "Question",
        required: true,
    },
    attemptNo:{
        type: Number,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    isQuizCompleted:{
        type: Boolean,
        required: true
    },
    userAns: {
        type: [String],
        required: true
    },
    viewedQuestionsCount: {
        type: Number,
        required: true
    },
    difficulty:{
        type: Number
    }
},  {timestamps : true })

module.exports = mongoose.model('UserResponse', userResponseSchema);
