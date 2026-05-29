let mongoose = require("mongoose")

let prescriptionSchema = new mongoose.Schema({
    "doctorId": {
        type: mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    "patientId": {
        type: mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    "doctorName":{
        type:String
    },
    "patientName": {
        type:String
    },
    "medicines": {
        type:String,
        required:true
    },
    "instructions": {
        type:String
    },
    "diagnosis": {
        type:String
    },
    "date": {
        type:String
    }
}, {timestamps:true})

let prescriptionModel = mongoose.model("prescription",prescriptionSchema)
module.exports = prescriptionModel