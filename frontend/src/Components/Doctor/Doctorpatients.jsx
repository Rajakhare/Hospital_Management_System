import { useEffect, useState } from "react";
import axios from "axios";

let DoctorPatients = () => {
  let email = localStorage.getItem("email");
  let [patients, setPatients] = useState([]);
  let [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getdoctorpatients/${email}`)
      .then((res) => {
        setPatients(res.data.patients || []);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Failed to fetch patients");
      });
  }, []);

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>My Patients</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Blood Group</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No patients found
                </td>
              </tr>
            ) : (
              patients.map((pat, index) => (
                <tr key={index}>
                  <td>{pat.name}</td>
                  <td>{pat.age}</td>
                  <td>{pat.gender}</td>
                  <td>{pat.phone}</td>
                  <td>{pat.bloodGroup}</td>
                  <td>{pat.address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorPatients;