import { useState, useEffect, useContext } from "react";
import axios from "axios";

let Editprofile = () => {
  let email = localStorage.getItem("email")
  let [msg, setMsg] = useState("");
  let [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    fee: "",
    age: "",
    gender: "",
    availability: "",
  });

  useEffect(() => {
    // Fetch doctor profile using email from context
    axios.get(`http://localhost:5000/getdoctorbyemail/${email}`)
      .then((res) => {
        console.log(res.data)
        let doc = res.data;
        setForm({
          name: doc.name || "",
          specialization: doc.specialization || "",
          experience: doc.experience || "",
          phone: doc.phone || "",
          fee: doc.fee || "",
          age: doc.age || "",
          gender: doc.gender || "",
          availability: doc.availability || "",
        });
      })
      .catch((err) => console.log(err));
  }, []);

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = () => {
    axios.put(`http://localhost:5000/updatedoctor/${email}`, form)
      .then((res) => {
        setMsg(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Failed to update profile");
      });
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>Edit Profile</h2>
      </div>

      {msg && (
        <p style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>
      )}

      <div style={{ background: "white", padding: "25px", borderRadius: "10px" }}>
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
              <option value="   Unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        <button className="submit-btn" style={{ marginTop: "20px" }} onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Editprofile;