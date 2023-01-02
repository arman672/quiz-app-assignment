const express = require("express")
const connectDb = require("./dbconnections/mongo.connection")
const quizRouter = require("./routers/quiz.routes")
const questionRouter = require("./routers/question.routes")
const userRouter = require("./routers/user.routes")
const cors = require("cors")
//console.log(quizRouter)

const app = express()
app.use(express.json())
connectDb();

app.use(cors())

app.use("/quiz", quizRouter); 
app.use("/question", questionRouter)
app.use("/user",userRouter)

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Express app running on port" + (process.env.PORT || 3001))
})
