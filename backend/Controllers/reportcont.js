const reportModel = require("../Models/reportmodel");
const doctorModel = require("../Models/doctormodel");
const patientModel = require("../Models/patientmodel");
const userModel = require("../Models/adminmodel");

// Doctor uploads report for patient
let uploadReport = async (req, res) => {
  try {
    let { patientId, diagnosis, medicines, instructions, amount, date } = req.body;
    let email = req.params.email;

    let user = await userModel.findOne({ email });
    if (!user) return res.json({ msg: "Doctor Not Found" });

    let doctor = await doctorModel.findOne({ doctorId: user._id });
    if (!doctor) return res.json({ msg: "Doctor Not Found" });

    let patient = await patientModel.findOne({ patientId: patientId });
    if (!patient) return res.json({ msg: "Patient Not Found" });

    let report = new reportModel({
      doctorId: doctor.doctorId,
      patientId: patient.patientId,
      doctorName: doctor.name,
      patientName: patient.name,
      diagnosis,
      medicines,
      instructions,
      amount,
      date,
    });

    await report.save();
    res.json({ msg: "Report Uploaded Successfully", report });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error uploading report", error: err.message });
  }
};

// Doctor views all reports they uploaded
let getDoctorReports = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.json({ msg: "Doctor Not Found" });

    let doctor = await doctorModel.findOne({ doctorId: user._id });
    if (!doctor) return res.json({ msg: "Doctor Not Found" });

    let reports = await reportModel.find({ doctorId: doctor.doctorId });
    res.json({ reports });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error fetching reports" });
  }
};

// Patient views their reports
let getPatientReports = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.json({ msg: "Patient Not Found" });

    let patient = await patientModel.findOne({ patientId: user._id });
    if (!patient) return res.json({ msg: "Patient Not Found" });

    let reports = await reportModel.find({ patientId: patient.patientId });
    res.json({ reports });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error fetching reports" });
  }
};

// Admin views all reports
let getAllReports = async (req, res) => {
  try {
    let reports = await reportModel.find().sort({ createdAt: -1 });
    res.json({ reports });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error fetching reports" });
  }
};

// Delete report
let deleteReport = async (req, res) => {
  try {
    await reportModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Report Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error deleting report" });
  }
};

module.exports = {
  uploadReport,
  getDoctorReports,
  getPatientReports,
  getAllReports,
  deleteReport
};