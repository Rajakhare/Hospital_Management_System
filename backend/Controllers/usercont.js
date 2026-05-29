let bcrypt = require("bcrypt")
let adminModel = require("../Models/adminmodel")
let jwt = require("jsonwebtoken")

let createAdmin = async(req,res)=> {
    try {
        let adminExists = await adminModel.findOne({"role":"admin"})
        if(adminExists) {
            res.json({"msg":"Admin Already Exists"})
        }
        else {
            let hashPass = await bcrypt.hash(req.body.password,10)
            let data = new adminModel({...req.body, "password":hashPass, "role":"admin", "uniqueId":"ADM-001"})
            await data.save()
            res.json({"msg":"Admin Created Successfully"})
        }
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Admin Creation"})
    }
}

let login = async(req,res)=> {
    try {
        let email = await adminModel.findOne({"email":req.body.email})
        if(email) {
            let pass = await bcrypt.compare(req.body.password,email.password)
            if(pass) {
                res.json({"token":jwt.sign({"_id":email._id},process.env.SECRET_KEY),"uniqueId":email.uniqueId, "name":email.name, "role":email.role,"email":email.email})
            }
            else {
                res.json({"msg":"Check Password"})
            }
        }
        else {
            res.json({"msg":"Check Email"})
        }
    }
    catch {
        res.json({"msg":"Error In Login Process."})
    }
}
module.exports = {createAdmin, login}