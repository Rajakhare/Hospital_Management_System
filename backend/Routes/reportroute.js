let express = require("express")
const { uploadReport, getDoctorReports, getPatientReports, getAllReports, deleteReport } = require("../Controllers/reportcont")

let reportroute = new express.Router()
reportroute.post("/uploadreport/:email",uploadReport)
reportroute.get("/getdoctorreports/:email",getDoctorReports)
reportroute.get("/getpatientreports/:email",getPatientReports)
reportroute.get("/getallreports",getAllReports)
reportroute.delete("/deletereport/:id",deleteReport)
module.exports = reportroute