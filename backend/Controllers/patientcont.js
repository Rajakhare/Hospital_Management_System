let bcrypt = require("bcrypt")
const patientModel = require("../Models/patientmodel")
const userModel = require("../Models/adminmodel")
const counterModel = require("../Models/countermodel")

let generatePatientId = async()=> {
    let counter = await counterModel.findOneAndUpdate({"name":"patient"}, {$inc: {value:1}}, {new:true, upsert:true})

    return "PAT-"+ String(counter.value).padStart(3, "0")
}


let createPatient=async(req,res)=> {
    try {
        let exisitingPatient = await userModel.findOne({"email":req.body.email})
        if(exisitingPatient) {
            res.json({"msg":"Already Email Exists"})
        }
        else {
            let uniqueId = await generatePatientId()

            let hashPass = await bcrypt.hash(req.body.password,10)
            let newUser = new userModel({
                "name":req.body.name,
                "email":req.body.email,
                "password":hashPass,
                "role":"patient",
                "uniqueId":uniqueId,
            })
            await newUser.save()

            let newPatient = new patientModel({
                "patientId":newUser._id,
                "name":newUser.name,
                "age":req.body.age,
                "gender":req.body.gender,
                "phone":req.body.phone,
                "bloodGroup":req.body.bloodGroup,
                "address":req.body.address,
            })
            await newPatient.save()
            res.json({"msg":"Patient Registered Successfully"})

        }
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Patient Registration"})
    }
}

let getAllPatients = async(req,res)=> {
    try {
        let data = await patientModel.find().populate('patientId')
        res.json(data)
    }
    catch {
        console.log(err)
        res.json({"msg":"Error In Fetching Patients"})
    }
}

let getPatientByEmail=async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) {
            return res.json({"msg":"User Not Found"})
        }

        let patient = await patientModel.findOne({"patientId":user._id}).populate("patientId")
        if(!patient) {
            return res.json({"msg":"Patient Not Found"})
        }
        else {
            res.json(patient)
        }
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Getting Patient"})
    }
}

let updatePatient = async(req,res)=> {
    let {name, age, gender, phone, bloodGroup, address} = req.body
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) {
            return res.json({"msg":"User Not Found"})
        }

        let patient = await patientModel.findOneAndUpdate({"patientId":user._id}, {name, age, gender, phone, bloodGroup,address})

        if(!patient) {
            return res.json({"msg":"Patient Not Found"})
        }
        res.json({"msg":"Patient Updated Successfully", patient})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Updation Process"})
    }
}

let deletePatient = async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) {
            return res.json({"msg":"Patient Not Found"})
        }
        else {
            await patientModel.findOneAndDelete({"patientId":user._id})
            await userModel.findOneAndDelete({"email":req.params.email})
            res.json({"msg":"Patient Deleted SuccessFully"})
        }
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Deletion"})
    }
}
module.exports = {createPatient, getAllPatients, getPatientByEmail, updatePatient, deletePatient}