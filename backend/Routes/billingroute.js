let express = require('express')
const { createBill, getAllBills, updateBillStatus, deleteBill, getPatientBills } = require('../Controllers/billingcont')
let billingroute = new express.Router()
billingroute.post("/createbill",createBill)
billingroute.get("/getallbills",getAllBills)
billingroute.put("/updateBillStatus/:id",updateBillStatus)
billingroute.delete("/deletebill/:id",deleteBill)
billingroute.get("/getpatientbills/:email",getPatientBills)

module.exports = billingroute