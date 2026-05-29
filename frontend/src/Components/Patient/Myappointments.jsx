import { useEffect, useState } from "react";
import axios from "axios";

let Myappointments = () => {
  let email = localStorage.getItem("email");
  let [appointments, setAppointments] = useState([]);
  let [msg, setMsg] = useState("");

  const fetchAppointments = () => {
    axios
      .get(`http://localhost:5000/getpatientappointments/${email}`)
      .then((res) => {
        setAppointments(res.data.appointments || []);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Failed to fetch appointments");
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel?")) {
      axios
        .put(`http://localhost:5000/updateappointmentstatus/${id}`, { status: "cancelled" })
        .then(() => fetchAppointments())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>My Appointments</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Fee</th>
              <th>Date</th>
              <th>TimeSlot</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>Dr. {apt.doctorName}</td>
                  <td>{apt.specialization}</td>
                  <td>₹{apt.fee}</td>
                  <td>{apt.date?.substring(0, 10)}</td>
                  <td>{apt.timeslot}</td>
                  <td>{apt.reason}</td>
                  <td>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background:
                        apt.status === "completed" ? "#d4edda" :
                        apt.status === "confirmed" ? "#cce5ff" :
                        apt.status === "cancelled" ? "#f8d7da" :
                        "#fff3cd",
                      color:
                        apt.status === "completed" ? "#155724" :
                        apt.status === "confirmed" ? "#004085" :
                        apt.status === "cancelled" ? "#721c24" :
                        "#856404",
                    }}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    {apt.status !== "cancelled" && apt.status !== "completed" && (
                      <button className="btn delete" onClick={() => handleCancel(apt._id)}>
                        Cancel
                      </button>
                    )}
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

export default Myappointments;