let mongoose = require("mongoose")

appointmentSchema = new mongoose.Schema({
    "patientId": {
        type:mongoose.Schema.Types.ObjectId,
        ref: "patient",
        required:true
    },
    "doctorId": {
        type: mongoose.Schema.Types.ObjectId,
        ref:"doctor",
        required: true
    },
    "date": {
        type:Date,
        default: Date.now(),
        required:true
    },
    "timeslot": {
        type:String,
        required:true
    },
    "reason": {
        type:String,
        required:true
    },
    "status": {
        type:String,
        enum:['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {timestamps: true});

let appointmentModel = mongoose.model("appointment",appointmentSchema)
module.exports = appointmentModel