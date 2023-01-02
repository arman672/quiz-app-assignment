const questionModel = require("../models/question.model")
const { success, error, validation, apiResponse } = require("../utilis/responseApi");

const addQuestion = async function(req,res){
    try {
        const data = req.body;
        const {quizHash, description, options,correctAns,createdBy } = data
        console.log(data)
        const savedData = await questionModel.create(data)
        return res.status(201).send(apiResponse(201,"success",savedData)) 
    } catch (error) {
        return res.status(500).send(apiResponse(500,"error",error.message))
    }
}

const getQuestion = async function(req, res){
    try {
        const data = req.query;
        //2d get user also to check if he is authorize to access the question on...do this by checking in quiz registration model
        const {quizHash, difficultyLevel} = data

        const findQues = await questionModel.findOne({quizHash: quizHash, difficultyLevel: difficultyLevel})

        if(!findQues) return res.status(404).send(apiResponse(404,"Not Found", null)) 
        else return res.status(200).send(apiResponse(200,"success",findQues))

    } catch (error) {
        return res.status(500).send(apiResponse(500,"error",error.message))
    }
}

module.exports= {addQuestion, getQuestion}