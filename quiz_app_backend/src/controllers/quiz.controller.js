const shortId = require('shortid')
const crypto = require("crypto")
const quizModel = require("../models/quiz.model")
const quizRegisterModel = require("../models/quizRegistration.model")
const { apiResponse } = require("../utilis/responseApi");

//res.status(200).json(success("OK", { data: "Some random data" }, res statusCode));
//res.status(500).json(error("Something went wrong", res.statusCode));
//res.status(422).json(validation({ username: "Username is required" }));
//apiResponse(code, msg, data)

const createQuiz = async function(req,res){
    try {
        const data = req.body;

        let hash = shortId.generate(crypto.randomUUID())
        const savedData = await quizModel.create({...data, quizHash: hash})
        return res.status(201).send(apiResponse(201,"success",savedData)) 
    } catch (error) {
        return res.status(500).send(apiResponse(500,"error",error.message))
    }
}

const getQuiz= async function(req, res){   
    try {
        const hash = req.params.hash
        const quiz = await quizModel.findOne({quizHash: hash})
        if(!quiz) return res.send("not found")
        return res.status(201).send(apiResponse(201,"success",quiz)) 

    } catch (error) {
        return res.status(500).send(apiResponse(500,"error",error.message))
    }
}

const assignQuiz = async function(req, res){
    try {
        const data = req.body;
        
        const {userEmail, quizHash, isActive, registerdBy} = data

        const quiz = await quizModel.findOne({quizHash: quizHash})
        if(!quiz) return res.send("not found")

        const savedData = await quizRegisterModel.create(data)
        
        return res.status(201).send(apiResponse(201,"success",savedData)) 
    } catch (error) {
        return res.status(500).send(apiResponse(500,"error",error.message))
    }
}

module.exports= {createQuiz, getQuiz, assignQuiz}