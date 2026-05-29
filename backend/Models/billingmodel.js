let mongoose = require("mongoose");

let billingSchema = new mongoose.Schema({
  "patientId" : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"patient"
  },
  "doctorId": {
    type: mongoose.Schema.Types.ObjectId,
    ref:"doctor"
  },
  "patientName": { 
    type: String, 
    required: true 
  },
  "doctorName": { 
    type: String, 
    required: true 
  },
  "date": { 
    type: Date, 
    required: true,
    default:Date.now()
  },
  "doctorFee": { 
    type: Number, 
    required: true 
  },
  "appointmentFee": { 
    type: Number, 
    default: 100 
  },
  "noOfAppointments": {
    type:Number,
    default:1
  },
  "totalAmount": { 
    type: Number, 
    required: true 
  },
  "status": { 
    type: String, 
    enum: ["paid", "pending"], 
    default: "pending" 
  },
}, { timestamps: true });

let billingModel = mongoose.model("billing", billingSchema)
module.exports = billingModel