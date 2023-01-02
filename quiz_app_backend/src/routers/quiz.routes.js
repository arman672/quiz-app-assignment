const quizController = require("../controllers/quiz.controller")
const express = require("express")
const router = express.Router()

//quiz routes
router.post("/create",quizController.createQuiz);
router.get("/get/:hash",quizController.getQuiz);
router.post("/assign",quizController.assignQuiz)

module.exports = router;