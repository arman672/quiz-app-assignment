const questionController = require("../controllers/question.controller")
const express = require("express")
const router = express.Router()

//questions routes
router.post("/add", questionController.addQuestion)
router.get("/get", questionController.getQuestion)

module.exports = router;