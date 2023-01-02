const userController = require("../controllers/user.controller")
const express = require("express")
const router = express.Router()

router.post("/register", userController.registerUser)
router.post("/login",userController.loginUser)
router.post("/submit-ans", userController.submitResponse)

module.exports = router;