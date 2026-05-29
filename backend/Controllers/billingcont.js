const userModel = require("../Models/adminmodel");
const billingModel = require("../Models/billingmodel");
const doctorModel = require("../Models/doctormodel");
const patientModel = require("../Models/patientmodel");

let createBill = async(req,res)=> {
    try {
        let {patientId, doctorId, noOfAppointments} = req.body

        let patient = await patientModel.findOne({"patientId":patientId})
        console.log(patientId)
        if(!patient) return res.json({"msg":"Patient Not Found"})


        let doctor = await doctorModel.findOne({"doctorId":doctorId})
        if(!doctor) return res.json({"msg":"Doctor Not Found"})

        let appointmentFee = 500;
        let doctorFee =doctor.fee;
        let totalAmount = (Number(doctorFee) + appointmentFee) * Number(noOfAppointments)

        let bill = new billingModel({
            patientId:patient.patientId,
            doctorId:doctor.doctorId,
            patientName:patient.name,
            doctorName:doctor.name,
            doctorFee,
            appointmentFee,
            noOfAppointments,
            totalAmount,
            status:"pending"
        });
        await bill.save();
        res.json({"msg":"Bill Created Successfully",bill})
    }
    catch(err){
        console.log(err)
        res.json({"msg":"Error In Bill Creation"})
    }
}

let getAllBills = async(req,res)=> {
    try {
        let bills = await billingModel.find().sort({createdAt: -1});
        res.json({bills})
    } catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Bills"})
    }
}

const reportModel = require("../Models/reportmodel");

let getPatientBills = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.json({ msg: "User Not Found" });

    let patient = await patientModel.findOne({ patientId: user._id });
    if (!patient) return res.json({ msg: "Patient Not Found" });

    // Get bills from billing collection
    let bills = await billingModel.find({ patientName: patient.name });

    // Get reports from report collection that have amount
    let reports = await reportModel.find({ 
      patientName: patient.name,
      amount: { $exists: true, $gt: 0 }
    });

    // Convert reports to bill format
    let reportBills = reports.map((rep) => ({
      _id: rep._id,
      doctorName: rep.doctorName,
      doctorFee: rep.amount,
      appointmentFee: 0,
      noOfAppointments: 1,
      totalAmount: rep.amount,
      status: "pending",
      type: "report",
      diagnosis: rep.diagnosis,
      date: rep.date
    }));

    // Convert bills to same format
    let billingBills = bills.map((bill) => ({
      _id: bill._id,
      doctorName: bill.doctorName,
      doctorFee: bill.doctorFee,
      appointmentFee: bill.appointmentFee,
      noOfAppointments: bill.noOfAppointments,
      totalAmount: bill.totalAmount,
      status: bill.status,
      type: "bill",
      date: bill.createdAt
    }));

    // Combine both
    let allBills = [...billingBills, ...reportBills];

    res.json({ bills: allBills });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error fetching bills" });
  }
};

let updateBillStatus = async (req, res) => {
  try {
    let bill = await billingModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ msg: "Bill status updated", bill });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error updating bill" });
  }
};

// Delete bill
let deleteBill = async (req, res) => {
  try {
    await billingModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Bill deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error deleting bill" });
  }
};

module.exports = {createBill, getAllBills, updateBillStatus, deleteBill,getPatientBills}