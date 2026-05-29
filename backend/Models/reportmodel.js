const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "doctor" 
  },
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "patient" 
  },
  doctorName: { 
    type: String 
  },
  patientName: { 
    type: String 
  },
  diagnosis: { 
    type: String, 
    required: true 
  },
  medicines: { 
    type: String 
  },
  instructions: { 
    type: String 
  },
  amount: { 
    type: Number 
  },
  date: { 
    type: String 
  },
}, { timestamps: true });

let reportModel = mongoose.model("report", reportSchema);
module.exports = reportModel