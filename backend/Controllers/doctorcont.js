let bcrypt = require("bcrypt")
const counterModel = require("../Models/countermodel")
const doctorModel = require("../Models/doctormodel")
const userModel = require("../Models/adminmodel")

let generateDoctorId = async()=> {
    let counter = await counterModel.findOneAndUpdate({"name":"doctor"}, {$inc:{value:1}}, {new:true, upsert:true})

    return "DOC-"+String(counter.value).padStart(3,"0")
}

let createDoctor = async(req,res)=> {
    try {
        let exisitingDoctor = await userModel.findOne({"email":req.body.email})

        if(exisitingDoctor) {
            res.json({"msg":"Already Email Exists"})
        }
        else {
            let uniqueId = await generateDoctorId()

            let hashPass = await bcrypt.hash(req.body.password,10)
            let newUser = new userModel({
                "name":req.body.name, 
                "email":req.body.email, 
                "password":hashPass, "role":"doctor", 
                "uniqueId":uniqueId
            })
            await newUser.save()

            let newDoctor = new doctorModel({
                "doctorId":newUser._id,
                "email":newUser.email,
                "name":newUser.name,
                "age":req.body.age,
                "gender":req.body.gender,
                "specialization":req.body.specialization,
                "experience":req.body.experience,
                "phone":req.body.phone,
                "fee":req.body.fee,
                "availability":req.body.availability,
            })
            await newDoctor.save()
            res.json({"msg":"Doctor Registered Successfully"})
        }
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Doctor Registration Process"})
    }
}

let getAllDoctors = async(req,res)=> {
    try {
        let data = await doctorModel.find().populate("doctorId")
        res.json(data)
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Data"})
    }
}

let getDoctorByEmail = async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) {
            return res.json({"msg":"User Not Found"})
        }

        let doctor = await doctorModel.findOne({"doctorId":user._id})
        if(!doctor) {
            return res.json({"msg":"Doctor Not Found"})
        }
        else {
            res.json(doctor)
        }
        
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Not Found"})
    }
}

let updateDoctor = async(req,res)=> {

    let {name,age,gender, specialization, experience, phone, fee, availability} = req.body
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) {
            return res.json({"msg":"Doctor Not Found"})
        }

        let doctor = await doctorModel.findOneAndUpdate({"doctorId":user._id}, {name,age,gender, specialization, experience, phone, fee, availability}).populate("doctorId")

        if(!doctor) {
            return res.json({"msg":"Doctor Not Found"})
        }

        await userModel.findByIdAndUpdate(user._id, {name})

        res.json({"msg":"Doctor Updated Successfully",doctor})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Updation"})
    }
}

let deleteDoctor = async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) {
            return res.json({"msg":"Doctor Not Found"})
        }
        else {
            await doctorModel.findOneAndDelete({"doctorId":user._id})
            await userModel.findOneAndDelete({"email":req.params.email})
            res.json({"msg":"Doctor Deleted Successfully"})
        }
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Deletion"})
    }
}

module.exports = {createDoctor,getAllDoctors, getDoctorByEmail, updateDoctor, deleteDoctor}