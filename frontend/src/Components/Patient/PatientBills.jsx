import { useEffect, useState } from "react";
import axios from "axios";

let PatientBills = ({ status }) => {
  let email = localStorage.getItem("email");
  let [bills, setBills] = useState([]);
  let [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/billingroute/getpatientbills/${email}`)
      .then((res) => {
        let all = res.data.bills || [];
        if (status === "all") {
          setBills(all);
        } else {
          setBills(all.filter((b) => b.status === status));
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg("Failed to fetch bills");
      });
  }, [status]);

  const getTitle = () => {
    if (status === "pending") return "Pending Bills";
    if (status === "paid") return "Payment History";
    return "All Bills";
  };

  // Summary
  let totalAmount = bills.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>{getTitle()}</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      {/* Summary Card */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <div style={{ borderLeft: "4px solid #5f8cff", paddingLeft: "15px" }}>
          <p style={{ color: "#777", fontSize: "13px", margin: 0 }}>Total Bills</p>
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "#5f8cff", margin: 0 }}>{bills.length}</p>
        </div>
        <div style={{ borderLeft: "4px solid #28a745", paddingLeft: "15px" }}>
          <p style={{ color: "#777", fontSize: "13px", margin: 0 }}>Total Amount</p>
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "#28a745", margin: 0 }}>₹{totalAmount}</p>
        </div>
      </div>

      {bills.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
          <div style={{ fontSize: "50px" }}>💳</div>
          <p>No {status === "all" ? "" : status} bills found</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="doctor-table">
            <thead>
                <tr>
                    <th>Doctor Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {bills.map((bill) => (
                    <tr key={bill._id}>
                    <td>Dr. {bill.doctorName}</td>
                    <td>
                        <span style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        background: bill.type === "report" ? "#e8f4fd" : "#f0fff4",
                        color: bill.type === "report" ? "#3f83f8" : "#28a745"
                        }}>
                        {bill.type === "report" ? "Medical Report" : "Billing"}
                        </span>
                    </td>
                    <td>₹{bill.totalAmount}</td>
                    <td>{bill.date?.substring(0, 10)}</td>
                    <td>
                        <span style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        background: bill.status === "paid" ? "#d4edda" : "#fff3cd",
                        color: bill.status === "paid" ? "#155724" : "#856404",
                        }}>
                        {bill.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientBills;