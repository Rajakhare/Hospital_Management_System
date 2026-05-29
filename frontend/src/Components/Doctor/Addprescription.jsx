import { useEffect, useState } from "react";
import axios from "axios";

let AddPrescription = () => {
  let email = localStorage.getItem("email");
  let [patients, setPatients] = useState([]);
  let [msg, setMsg] = useState("");
  let [form, setForm] = useState({
    patientId: "",
    diagnosis: "",
    medicines: "",
    instructions: "",
    date: "",
  });

  useEffect(() => {
    // Get only doctor's patients
    axios.get(`http://localhost:5000/getdoctorpatients/${email}`)
      .then((res) => {
        setPatients(res.data.patients || []);
      })
      .catch((err) => console.log(err));
  }, []);

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = () => {
    if (!form.patientId || !form.medicines || !form.date) {
      return setMsg("Patient, medicines and date are required");
    }
    axios
      .post(`http://localhost:5000/prescription/addprescription/${email}`, form)
      .then((res) => {
        setMsg(res.data.msg);
        setForm({ patientId: "", diagnosis: "", medicines: "", instructions: "", date: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>Add Prescription</h2>
      </div>

      {msg && (
        <p style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>
      )}

      <div style={{ background: "white", padding: "25px", borderRadius: "10px" }}>
        <div className="form-grid">
          <div>
            <label>Select Patient</label>
            <select name="patientId" value={form.patientId} onChange={handleChange}>
              <option value="" disabled>--- Select Patient ---</option>
              {patients.map((pat,ind) => (
                <option key={ind} value={pat.patientId}>
                  {pat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </div>

          <div>
            <label>Diagnosis</label>
            <input type="text" name="diagnosis" placeholder="Enter diagnosis" value={form.diagnosis} onChange={handleChange} />
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Medicines</label>
          <textarea
            rows={3}
            name="medicines"
            placeholder="Enter medicines e.g. Paracetamol 500mg - twice daily"
            value={form.medicines}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e2e2", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Instructions</label>
          <textarea
            rows={3}
            name="instructions"
            placeholder="Enter instructions e.g. Take after meals, drink plenty of water"
            value={form.instructions}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e2e2", marginTop: "5px" }}
          />
        </div>

        <button className="submit-btn" style={{ marginTop: "20px" }} onClick={handleSubmit}>
          Add Prescription
        </button>
      </div>
    </div>
  );
};

export default AddPrescription;