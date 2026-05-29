import { useEffect, useState } from "react";
import axios from "axios";

let DoctorAppointments = () => {
  let email = localStorage.getItem("email");
  let [appointments, setAppointments] = useState([]);
  let [msg, setMsg] = useState("");

  const fetchAppointments = () => {
    axios
      .get(`http://localhost:5000/getdoctorappointments/${email}`)
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

  const handleStatusUpdate = (id, status) => {
    axios
      .put(`http://localhost:5000/updateappointmentstatus/${id}`, { status })
      .then(() => fetchAppointments())
      .catch((err) => console.log(err));
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
              <th>Patient Name</th>
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
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.patientName}</td>
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
                    <div style={{ display: "flex", gap: "5px" }}>
                      {apt.status === "pending" && (
                        <button className="btn edit"
                          onClick={() => handleStatusUpdate(apt._id, "confirmed")}>
                          Approve
                        </button>
                      )}
                      {apt.status === "confirmed" && (
                        <button className="btn edit"
                          onClick={() => handleStatusUpdate(apt._id, "completed")}>
                          Complete
                        </button>
                      )}
                      {apt.status !== "cancelled" && apt.status !== "completed" && (
                        <button className="btn delete"
                          onClick={() => handleStatusUpdate(apt._id, "cancelled")}>
                          Cancel
                        </button>
                      )}
                    </div>
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

export default DoctorAppointments;