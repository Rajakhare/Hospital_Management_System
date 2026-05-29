import { useEffect, useState } from "react";
import axios from "axios";

let ViewPrescriptions = () => {
  let email = localStorage.getItem("email");
  let [prescriptions, setPrescriptions] = useState([]);
  let [msg, setMsg] = useState("");

  const fetchPrescriptions = () => {
    axios
      .get(`http://localhost:5000/prescription/getdoctorprescriptions/${email}`)
      .then((res) => {
        setPrescriptions(res.data.prescriptions || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:5000/prescription/deleteprescription/${id}`)
        .then(() => fetchPrescriptions())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>My Prescriptions</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Medicines</th>
              <th>Instructions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No prescriptions found
                </td>
              </tr>
            ) : (
              prescriptions.map((pre) => (
                <tr key={pre._id}>
                  <td>{pre.patientName}</td>
                  <td>{pre.date}</td>
                  <td>{pre.diagnosis}</td>
                  <td>{pre.medicines}</td>
                  <td>{pre.instructions}</td>
                  <td>
                    <button className="btn delete" onClick={() => handleDelete(pre._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPrescriptions;