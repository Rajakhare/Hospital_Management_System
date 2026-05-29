import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

let Appointments = () => {
  let { status } = useParams();
  let [data, setData] = useState([]);
  let [msg, setMsg] = useState("");

  const fetchAppointments = () => {
    axios
      .get(`http://localhost:5000/getappointmentbystatus/${status}`)
      .then((res) => {
        // handle both cases whether backend returns array or object
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (res.data.appointments) {
          setData(res.data.appointments);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);
        setMsg("Failed to fetch appointments");
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, [status]);

  const handleStatusUpdate = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/updateappointmentstatus/${id}`, { status: newStatus })
      .then(() => fetchAppointments())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:5000/deleteappointment/${id}`)
        .then(() => fetchAppointments())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>{status?.charAt(0).toUpperCase() + status?.slice(1)} Appointments</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>TimeSlot</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No {status} appointments found
                </td>
              </tr>
            ) : (
              data.map((obj) => (
                <tr key={obj._id}>
                  <td>{obj.patientName}</td>
                  <td>Dr.{obj.doctorName}</td>
                  <td>{obj.date?.substring(0, 10)}</td>
                  <td>{obj.timeslot}</td>
                  <td>{obj.reason}</td>
                  <td>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background:
                        obj.status === "completed" ? "#d4edda" :
                        obj.status === "confirmed" ? "#cce5ff" :
                        obj.status === "cancelled" ? "#f8d7da" :
                        "#fff3cd",
                      color:
                        obj.status === "completed" ? "#155724" :
                        obj.status === "confirmed" ? "#004085" :
                        obj.status === "cancelled" ? "#721c24" :
                        "#856404",
                    }}>
                      {obj.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {obj.status === "pending" && (
                        <button className="btn edit" onClick={() => handleStatusUpdate(obj._id, "confirmed")}>
                          Confirm
                        </button>
                      )}
                      {obj.status === "confirmed" && (
                        <button className="btn edit" onClick={() => handleStatusUpdate(obj._id, "completed")}>
                          Complete
                        </button>
                      )}
                      {obj.status !== "cancelled" && obj.status !== "completed" && (
                        <button className="btn delete" onClick={() => handleStatusUpdate(obj._id, "cancelled")}>
                          Cancel
                        </button>
                      )}
                      <button className="btn delete" onClick={() => handleDelete(obj._id)}>
                        Delete
                      </button>
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

export default Appointments;