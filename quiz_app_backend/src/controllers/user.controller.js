const userModel = require("../models/user.model")
const questionModel = require("../models/question.model")
const { success, error, validation, apiResponse } = require("../utilis/responseApi");
const userResponseModel = require("../models/userResponse.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

//register user
const registerUser = async function (req, res) {
    try {
        let data = req.body
        let { name, email, phone, password} = data

        let emailCheck = await userModel.findOne({ email: email })
        if (emailCheck) {
            return res.status(400).send({ status: false, message: "emailId is already in use" })
        }

        if (password.length > 7) {
            return res.status(400).send({ status: false, message: "password should be more than 8 characters or less than 15 characters" })
        }

        let phoneCheck = await userModel.findOne({ phone: phone })
        if (phoneCheck) {
            return res.status(400).send({ status: false, message: "phone number is already in use" })
        }

        data.password = await bcrypt.hash(password, 10)
        let createdUser = await userModel.create(data)

        return res.status(201).send({ status: true, message: "User created successsfully", data: createdUser })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//login
const loginUser = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        const foundUser = await userModel.findOne({ email: email })

        if (!foundUser) return res.status(401).send({ status: false, message: "invalid credentials" })

        const cmprPassword = await bcrypt.compare(password, foundUser.password)
        
        if (!foundUser || !cmprPassword) return res.status(401).send({ status: false, message: "invalid credentials" })

        const token = await jwt.sign({ userId: foundUser._id }, "groot", { expiresIn: "7d" })

        return res.status(200).send({ status: true, message: "User login successfull", data: { userId: foundUser._id, token: token } })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//post
const submitResponse = async function(req,res){
    try {
        const data = req.body;

        let {emailId, quizHash, questionId, attemptNo, score,isQuizCompleted, userAns, viewedQuestionsCount, difficulty} = data

        //todo chcek if response alredy exist for this if it does.. dont change anythinh

        const question = await questionModel.findOne({questionId: questionId, difficultyLevel: difficulty})
        // console.log(question)
        if(!question) return res.send({data: "notfound"})

        //calculations
        data.attemptNo += 1
        
        if(question.correctAns == userAns){
            data.score += 5
            data.isCorrect = true
            if(question.difficultyLevel == 10){
                isQuizCompleted = true;
            }
            data.difficulty += 1
        }else {
            data.score -= 2
            data.isCorrect = false
            if(question.difficultyLevel == 1){
                isQuizCompleted = true;
            }
            data.difficulty -= 1
        }
        
        //check if alredy viewed question
        const viewedQuestion = await userResponseModel.findOne({
            emailId: emailId,
            quizHash: quizHash,
            questionId : questionId
        })

        if(viewedQuestion){
            
        }else {
            data.viewedQuestionsCount += 1
            if(data.viewedQuestionsCount == 10){
                data.isQuizCompleted = true;
            }
        }

        console.log(data.viewedQuestionsCount)
        await userResponseModel.create(data)

        return res.status(201).send(apiResponse(201,"success",data)) 
    } catch (error) {
        return res.status(500).send(apiResponse(500,"error",error.message))
    }
}



module.exports= {registerUser, loginUser, submitResponse}