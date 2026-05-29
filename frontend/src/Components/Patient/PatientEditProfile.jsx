import { useState, useEffect, useContext } from "react";
import axios from "axios";

let PatientEditProfile = () => {
  let email = localStorage.getItem("email")
  let [msg, setMsg] = useState("");
  let [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    bloodGroup: "",
    address: "",
  });

  useEffect(() => {
    // Fetch doctor profile using email from context
    axios.get(`http://localhost:5000/getpatientbyemail/${email}`)
      .then((res) => {
        let pat = res.data;
        setForm({
          name: pat.name || "",
          age: pat.age || "",
          gender: pat.gender || "",
          phone: pat.phone || "",
          bloodGroup: pat.bloodGroup || "",
          address: pat.address || "",
        });
      })
      .catch((err) => console.log(err));
  }, []);

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = () => {
    axios.put(`http://localhost:5000/updatepatient/${email}`, form)
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
            <label>Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label>BloodGroup</label>
            <input type="text" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} />
          </div>
          <div>
            <label>Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} />
          </div>
        </div>

        <button className="submit-btn" style={{ marginTop: "20px" }} onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PatientEditProfile;