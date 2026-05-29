let mongoose = require("mongoose")

let adminSchema = new mongoose.Schema({
    "uniqueId": {
        type:String,
        unique:true
    },
    "name":String,
    "email":String,
    "password":String,
    "role": {
        type:String,
        enum:['admin', 'doctor', 'patient'],
        default:"patient"
    },
})

let userModel = mongoose.model("user",adminSchema)
module.exports = userModel