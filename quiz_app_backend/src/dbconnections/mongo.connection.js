const mongoose = require("mongoose")
const connectDb = () =>{
    mongoose.connect("mongodb+srv://Arman:W0ZPcEp2jiZXKgid@cluster0.ilfh6.mongodb.net/quiz")
    .then(()=> console.log("mongodb is connected with server"))
    .catch((err)=> console.log(err))
}

module.exports = connectDb;