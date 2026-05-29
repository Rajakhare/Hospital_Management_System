const userModel = require("../Models/adminmodel")
const doctorModel = require("../Models/doctormodel")
const patientModel = require("../Models/patientmodel")
const prescriptionModel = require("../Models/prescriptionmodel")



let addPrescription = async(req,res)=> {
    try {
        let {patientId, medicines, instructions, diagnosis, date}=req.body

        let user = await userModel.findOne({"email":req.params.email})
        if(!user) return res.json({"msg":"User Not Found"})

        let doctor = await doctorModel.findOne({"doctorId":user._id})
        if(!doctor) return res.json({"msg":"Doctor Not Found"})

        let patient = await patientModel.findOne({patientId})
        if(!patient) return res.json({"msg":"Patient Not Found"})

        let prescription = new prescriptionModel({
            "doctorId":doctor.doctorId,
            "patientId":patient.patientId,
            "doctorName":doctor.name,
            "patientName":patient.name,
            medicines,
            instructions,
            diagnosis,
            date,
        })

        await prescription.save()
        res.json({"msg":"Prescription Added Successfully",prescription})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Adding Prescription"})
    }
}

let getDoctorPrescriptions = async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) return res.json({"msg":"User Not Found"})

        let doctor = await doctorModel.findOne({"doctorId":user._id})
        if(!doctor) return res.json({"msg":"Doctor Not Found"})

        let prescriptions = await prescriptionModel.find({"doctorId":doctor.doctorId})
        res.json({prescriptions})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Prescription"})
    }
}

let getPatientPrescriptions = async(req,res)=> {
    try {
        console.log("email",req.params.email)
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) return res.json({"msg":"User Not Found"})
        console.log(user._id)

        let patient = await patientModel.findOne({"patientId":user._id})
        if(!patient) return res.json({"msg":"Patient Not Found"})
        console.log(patient.patientId)

        let prescriptions = await prescriptionModel.find({"patientId":patient.patientId})
        res.json({prescriptions})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Prescriptions"})
    }
}

let deletePrescription = async(req,res)=> {
    try{
        await prescriptionModel.findByIdAndDelete(req.params.id)
        res.json({"msg":"Prescription Deleted Successfully"})
    } catch(err) {
        console.log(err)
        res.json({"msg":"Error Deleting Prescription"})
    }
}
module.exports = {addPrescription,getDoctorPrescriptions,getPatientPrescriptions,deletePrescription}