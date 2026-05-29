const userModel = require("../Models/adminmodel");
const appointmentModel = require("../Models/appointmentmodel")
const doctorModel = require("../Models/doctormodel")
let patientModel = require("../Models/patientmodel")

let bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, timeslot, reason } = req.body;

    console.log("req.body", req.body);

    if (!doctorId || !date || !timeslot || !reason) {
      return res.json({ msg: "All fields are required" });
    }
    if(!patientId) {
        return res.json({"msg":"Patient Not Selected"})
    }

    let patient = await patientModel.findOne({"patientId":patientId});
    if (!patient) {
      return res.json({ msg: "Patient Not Found" });
    }

    let doctor = await doctorModel.findOne({"doctorId":doctorId});
    if (!doctor) {
      return res.json({ msg: "Doctor Not Found" });
    }

    let existingAppointment = await appointmentModel.findOne({
      doctorId: doctor.doctorId,
      date,
      timeslot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      return res.json({ msg: "This Time Slot is already Booked" });
    }

    let appointment = new appointmentModel({
      patientId: patient.patientId,
      doctorId: doctor.doctorId,
      date,
      timeslot,
      reason,
    });
    await appointment.save();

    res.json({ msg: "Appointment Booked Successfully", appointment });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error", error: err.message });
  }
};

let getAllAppointments = async(req,res)=> {
    try {
        let data = await appointmentModel.find()
        let patients = await patientModel.find()
        let doctors = await doctorModel.find()

        let result = await Promise.all(
            data.map(async (apt)=> {
                let patientUser = await userModel.findById(apt.patientId)
                let doctorUser = await userModel.findById(apt.doctorId)

                return{
                    _id: apt._id,
                    date: apt.date,
                    timeslot: apt.timeslot,
                    reason: apt.reason,
                    status: apt.status,
                    patientName: patientUser?.name || "Not Found",
                    doctorName: doctorUser?.name || "Not Found",
                }
            })
        )
        
        res.json({"appointments":result})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Appointments"})
    }
}

let getAppointmentByStatus = async(req,res)=> {
    try {
        let data = await appointmentModel.find({status: req.params.status});

        console.log("status:", req.params.status);
        console.log("appointments found:", data.length);
        console.log("first apt:", data[0]);
        console.log("first apt patientId:", data[0]?.patientId);
        console.log("first apt doctorId:", data[0]?.doctorId);
        let result = await Promise.all(
            data.map(async (apt)=> {
                let patientUser = await userModel.findById(apt.patientId)
                let doctorUser = await userModel.findById(apt.doctorId)
                return{
                    _id: apt._id,
                    date: apt.date,
                    timeslot: apt.timeslot,
                    reason: apt.reason,
                    status: apt.status,
                    patientName: patientUser?.name || "Not Found",
                    doctorName: doctorUser?.name || "Not Found",
                }
            })
        )
        
        res.json({"appointments":result})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Appointments"})
    }
}


let getAppointmentById = async(req,res)=> {
    try {
        let appointment = await appointmentModel.findById(req.params.id)
        if(!appointment) {
            return res.json({"msg":"Appointment Not Found"})
        }
        res.json({appointment})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Appointment"})
    }
}

let updateAppointmentStatus = async(req,res)=> {
    try {
        let validStatuses = ["pending", "confirmed", "cancelled", "completed"]
        if (!validStatuses.includes(req.body.status)) {
            return res.json({"msg":"Invalid Status"})
        }
        let appointment = await appointmentModel.findByIdAndUpdate(req.params.id, {status:req.body.status}, {new:true})

        if(!appointment) {
            return res.json({"msg":"Appointment Not Found"})
        }
        res.json({"msg":"Status Updated", appointment})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Updating Appointment Status"})
    }
}

let cancelAppointment = async(req,res)=> {
    try {
        let appointment = await appointmentModel.findByIdAndUpdate(req.params.id, {status:"cancelled"}, {new:true}).populate("patientId").populate("doctorId")

        if(!appointment) {
            return res.json({"msg":"Appointment Not Found"})
        }
        res.json({"msg":"Appointment Cancelled",appointment})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Cancelling Appointment"})
    }
}

let completeAppointment = async(req,res)=> {
    try {
        let appointment = await appointmentModel.findByIdAndUpdate(req.params.id, {status:"completed"}, {new:true}).populate("patientId").populate("doctorId")
        if(!appointment) {
            res.json({"msg":"Appointment Not Found"})
        }
        res.json({"msg":"Appointment Completed",appointment})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Completing Appointment"})
    }
}

let deleteAppointment = async(req,res)=> {
    try {
        let appointment = await appointmentModel.findByIdAndDelete(req.params.id)
        
        if(!appointment) {
            res.json({"msg":"Appointment Not Found"})
        }
        res.json({"msg":"Appointment Deleted Successfully"})
    }   
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Deleting Appointment"})   
    }
}

let getDoctorAppointments = async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) return res.json({"msg":"User Not Found"})

        let doctor = await doctorModel.findOne({"doctorId":user._id})
        if(!doctor) return res.json({"msg":"Doctor Not Found"})

        let appointments = await appointmentModel.find({"doctorId":doctor.doctorId})

        let patients = await patientModel.find();

        let result = await appointments.map((apt)=> {
            let patient = patients.find(
                (p)=>p.patientId?.toString() === apt.patientId?.toString()
            )

            return{
                "_id":apt._id,
                "date":apt.date,
                "timeslot":apt.timeslot,
                "reason":apt.reason,
                "status":apt.status,
                "patientName":patient?.name || "Not Found",
            }
        })

        res.json({"appointments":result})
    }
    catch(err) {
       console.log(err)
       res.json({"msg":"Error In Getting Doctor Appointments"})
    }
}

let getDoctorPatients = async (req,res)=> {
    try {
       let user = await userModel.findOne({"email":req.params.email})
       if(!user) return res.json({"msg":"User Not Found"})

       let doctor = await doctorModel.findOne({"doctorId":user._id})
       if(!doctor) return res.json({"msg":"Doctor Not Found"})

       let appointments = await appointmentModel.find({"doctorId":doctor.doctorId})

       let patientIds = [...new Set(appointments.map((apt) => apt.patientId?.toString()))]

       let patients = await patientModel.find()

       let result = patientIds.map((pid)=> {
        let patient = patients.find((p)=> p.patientId?.toString()===pid)

        return {
            "patientId":patient?.patientId,
            "name":patient?.name || "Not Found",
            "age":patient?.age || "Not Found",
            "gender":patient?.gender || "Not Found",
            "phone":patient?.phone || "Not Found",
            "bloodGroup":patient?.bloodGroup || "Not Found",
            "address":patient?.address || "Not Found",
        }
       }).filter((p)=>p.name !== "Not Found")

       res.json({"patients":result})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Getting Doctor Patients"})
    }
}

let getPatientAppointments = async(req,res)=> {
    try {
        let user = await userModel.findOne({"email":req.params.email})
        if(!user) return res.json({"msg":"User Not Found"})

        let patient = await patientModel.findOne({"patientId":user._id})
        if(!patient) return res.json({"msg":"Patient Not Found"})
        
        let appointments = await appointmentModel.find({"patientId":patient.patientId})
        
        let doctors = await doctorModel.find()

        let result = appointments.map((apt)=> {
            let doctor = doctors.find(
                (d)=> d.doctorId?.toString()=== apt.doctorId?.toString()
            )

            return{
                "_id":apt._id,
                "date":apt.date,
                "timeslot":apt.timeslot,
                "reason":apt.reason,
                "status":apt.status,
                "doctorName":doctor?.name || "Not Found",
                "specialization":doctor?.specialization || "",
                "fee":doctor?.fee || "",
            }
        })

        res.json({"appointments":result})
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Patient Appointments"})
    }
}

let getAppointmentsByDate = async(req,res)=> {
    try {
        let appointments = await appointmentModel.find({"date":req.params.date}).populate("patientId").populate("doctorId")
        res.json(appointments)
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Appointments"})
    }
}

let getAppointmentsByStatus = async(req,res)=> {
    try {
        let appointments = await appointmentModel.find({"status":req.params.status}).populate("patientId").populate("doctorId") 
        res.json(appointments)
    }
    catch(err) {
        console.log(err)
        res.json({"msg":"Error In Fetching Appointments"})
    }
}


module.exports = {bookAppointment, getAllAppointments, getAppointmentById,getAppointmentByStatus, updateAppointmentStatus, cancelAppointment, completeAppointment, deleteAppointment, getDoctorPatients, getAppointmentsByDate,getDoctorAppointments,getPatientAppointments}