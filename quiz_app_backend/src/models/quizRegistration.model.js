const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const quizRegistration = new mongoose.Schema({
    userEmail:{
        type: String,
        required: true
    },
    quizHash: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    registerdBy: {
        type: String,
        required: true
    }
    
},  {timestamps : true })

module.exports = mongoose.model('QuizRegistration', quizRegistration);
