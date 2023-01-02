const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const quizSchema = new mongoose.Schema({
    quizName:{
        type: String,
        required: true
    },
    quizHash: {
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },

    
},  {timestamps : true })

module.exports = mongoose.model('Quiz', quizSchema);
