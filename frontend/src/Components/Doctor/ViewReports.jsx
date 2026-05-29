import { useEffect, useState } from "react";
import axios from "axios";

let ViewReports = () => {
  let email = localStorage.getItem("email");
  let [reports, setReports] = useState([]);

  const fetchReports = () => {
    axios.get(`http://localhost:5000/report/getdoctorreports/${email}`)
      .then((res) => setReports(res.data.reports || []))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:5000/report/deletereport/${id}`)
        .then(() => fetchReports())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>My Reports</h2>
      </div>
      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Medicines</th>
              <th>Instructions</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No reports found</td>
              </tr>
            ) : (
              reports.map((rep) => (
                <tr key={rep._id}>
                  <td>{rep.patientName}</td>
                  <td>{rep.date}</td>
                  <td>{rep.diagnosis}</td>
                  <td>{rep.medicines}</td>
                  <td>{rep.instructions}</td>
                  <td>₹{rep.amount}</td>
                  <td>
                    <button className="btn delete" onClick={() => handleDelete(rep._id)}>
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

export default ViewReports;