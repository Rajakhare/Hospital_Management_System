let mongoose = require("mongoose")

let patientSchema = new mongoose.Schema({
    "patientId": {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    "name":String,
    "age":Number,
    "gender": {
        type:String,
        enum:["male","female","other"]
    },
    "phone":String,
    "bloodGroup": {
        type:String,
        enum:["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    "address":String,
})

let patientModel = mongoose.model("patient",patientSchema)
module.exports = patientModel