import { useEffect, useState } from "react";
import axios from "axios";

let Bookappointment = () => {
  let role = localStorage.getItem("role")
  let email = localStorage.getItem("email")
  let [doctor, setDoctor] = useState([]);
  let [patient, setPatient] = useState([]);
  let [data, setData] = useState({
    doctorId: "",
    patientId: "",
    date: "",
    timeslot: "",
    reason: ""
  });
  let [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/getalldoctors").then((res) => {
      setDoctor(res.data.doctors || res.data);
    });

    if(role === "admin") {
      axios.get("http://localhost:5000/getallpatients").then((res) => {
      setPatient(res.data.patients || res.data);
    });
    }

    // If patient get their own patientId automatically
    if (role === "patient") {
      axios.get(`http://localhost:5000/getpatientbyemail/${email}`).then((res) => {
        setData((prev) => ({ ...prev, patientId: res.data.patientId }));
      });
    }
  }, []);

  let handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let book = () => {
    if (!data.doctorId) return setMsg("Please select a doctor");
    if (!data.date) return setMsg("Please select a date");
    if (!data.timeslot) return setMsg("Please select a time slot");
    if (!data.reason) return setMsg("Please enter a reason");

    if (role === "admin" && !data.patientId) return setMsg("Please select a patient");

    console.log("data being sent", data);

    axios
      .post("http://localhost:5000/bookappointment", data)
      .then((res) => {
        setMsg(res.data.msg);
        setData((prev) => ({
        ...prev,
        doctorId: "",
        date: "",
        timeslot: "",
        reason: "",
        // Keep patientId for patient role so it stays set
        patientId: role === "patient" ? prev.patientId : "",
      }));
      })
      .catch((err) => {
        console.log(err);
        setMsg("Failed to book appointment");
      });
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <div className="form-card">
          <h2>Book Appointment</h2>
          <p className="sub-text">Fill in the details to schedule an appointment</p>

          {msg && (
            <div style={{
              color: msg.includes("success") ? "green" : "red",
              textAlign: "center",
              marginBottom: "10px"
            }}>
              {msg}
            </div>
          )}

          <div className="form-grid">
            <select name="doctorId" value={data.doctorId} onChange={handleChange}>
              <option value="" disabled>--- Select Doctor ---</option>
              {doctor && doctor.map((doc) => (
                <option key={doc._id} value={doc.doctorId?._id || doc.doctorId}>
                  {doc.name} - {doc.specialization}
                </option>
              ))}
            </select>

            {role==="admin"&&<select name="patientId" value={data.patientId} onChange={handleChange}>
              <option value="" disabled>--- Select Patient ---</option>
              {patient && patient.map((pat) => (
                <option key={pat._id} value={pat._id}>
                  {pat.name}
                </option>
              ))}
            </select>}

            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />

            <select name="timeslot" value={data.timeslot} onChange={handleChange}>
              <option value="" disabled>--- Select Time Slot ---</option>
              <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
              <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
              <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
              <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
              <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
              <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
              <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
              <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
              <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
            </select>
          </div>

          <textarea
            rows={3}
            name="reason"
            placeholder="Enter reason for appointment"
            value={data.reason}
            onChange={handleChange}
          />

          <button className="submit-btn" onClick={book}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookappointment;