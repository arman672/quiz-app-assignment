const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new mongoose.Schema({
    quizHash: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    options:{
        type: [String],
        required: true
    },
    correctAns:{
        type: [String],
        required: true
    },
    difficultyLevel:{
        type: Number,
        enum: [1,2,3,4,5,6,7,8,9,10],
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
},  {timestamps : true })

module.exports = mongoose.model('Question', questionSchema);
