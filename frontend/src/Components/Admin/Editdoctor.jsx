import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

let Editdoctor = () => {
  let { state } = useLocation();
  let navigate = useNavigate();
  let doctor = state?.doctor;

  let [form, setForm] = useState({
    name: doctor?.name || "",
    specialization: doctor?.specialization || "",
    experience: doctor?.experience || "",
    phone: doctor?.phone || "",
    fee: doctor?.fee || "",
    availability: doctor?.availability || "",
    gender: doctor?.gender || "",
    age: doctor?.age || "",
  })

  let [msg, setMsg] = useState("")

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  let handleSubmit = () => {
    axios.put(`http://localhost:5000/updatedoctor/${doctor?.doctorId?.email}`, form)
      .then((res) => {
        setMsg(res.data.msg)
        setTimeout(() => {
          navigate("/admindashboard/viewdoctor")
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        setMsg("Failed to update doctor")
      })
  }

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>Edit Doctor</h2>
      </div>

      {msg && (
        <p style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>
      )}

      <div className="form-card" style={{ background: "white", padding: "25px", borderRadius: "10px" }}>
        <div className="form-grid">
          <div>
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label>Specialization</label>
            <input type="text" name="specialization" value={form.specialization} onChange={handleChange} />
          </div>
          <div>
            <label>Experience (years)</label>
            <input type="number" name="experience" value={form.experience} onChange={handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label>Fee (₹)</label>
            <input type="number" name="fee" value={form.fee} onChange={handleChange} />
          </div>
          <div>
            <label>Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Availability</label>
            <select name="availability" value={form.availability} onChange={handleChange}>
              <option value="available">Available</option>
              <option value="not available">not available</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button className="submit-btn" onClick={handleSubmit}>
            Save Changes
          </button>
          <button
            className="btn delete"
            onClick={() => navigate("/admindashboard/viewdoctor")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Editdoctor