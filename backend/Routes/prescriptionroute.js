let express = require("express")
let {addPrescription, getDoctorPrescriptions, getPatientPrescriptions, deletePrescription} = require("../Controllers/prescriptioncont")
const prescriptionModel = require("../Models/prescriptionmodel")
let prescriptionroute = new express.Router()
prescriptionroute.post("/addprescription/:email",addPrescription)
prescriptionroute.get("/getdoctorprescriptions/:email",getDoctorPrescriptions)
prescriptionroute.get("/getpatientprescriptions/:email",getPatientPrescriptions),
prescriptionroute.delete("/deleteprescription/:id",deletePrescription)

module.exports = prescriptionroute