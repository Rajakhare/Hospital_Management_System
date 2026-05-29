let mongoose = require("mongoose")

let doctorSchema = new mongoose.Schema({
    "doctorId": {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    "name":String,
    "age":Number,
    "gender":String,
    "specialization":String,
    "experience":Number,
    "phone":String,
    "fee":Number,
    "availability": {
        type:String
    },
})

let doctorModel = mongoose.model("doctor",doctorSchema)
module.exports = doctorModel