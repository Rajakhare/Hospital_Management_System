import { useEffect, useState } from "react"
import axios from "axios"
import "./billing.css"

let Billing = () => {
  let [data, setData] = useState({ patientId: "", doctorId: "", noOfAppointments: "" })
  let [doctors, setDoctors] = useState([])
  let [patients, setPatients] = useState([])
  let [bills, setBills] = useState([])
  let [msg, setMsg] = useState("")

  const fetchBills = () => {
    axios.get("http://localhost:5000/billingroute/getallbills").then((res) => {
      setBills(res.data.bills || [])
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    axios.get("http://localhost:5000/getalldoctors").then((res) => {
      setDoctors(res.data.doctors || res.data)
    })
    axios.get("http://localhost:5000/getallpatients").then((res) => {
      setPatients(res.data.patients || res.data)
    })
    fetchBills()
  }, [])

  let handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  let bill = () => {
    axios.post("http://localhost:5000/billingroute/createbill", data).then((res) => {
      setMsg(res.data.msg)
      setData({ patientId: "", doctorId: "", noOfAppointments: "" })
      fetchBills()
    }).catch((err) => {
      console.log(err)
    })
  }

  let handleStatusUpdate = (id, status) => {
    axios.put(`http://localhost:5000/billingroute/updatebillstatus/${id}`, { status })
      .then(() => fetchBills())
      .catch((err) => console.log(err))
  }

  let handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:5000/billingroute/deletebill/${id}`)
        .then(() => fetchBills())
        .catch((err) => console.log(err))
    }
  }

  // Summary stats
  let totalBills = bills.length
  let totalAmount = bills.reduce((sum, b) => sum + b.totalAmount, 0)
  let pendingAmount = bills.filter((b) => b.status === "pending").reduce((sum, b) => sum + b.totalAmount, 0)
  let paidAmount = bills.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.totalAmount, 0)

  return (
    <div className="billing-form-container">

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
        {[
          { label: "Total Bills", value: totalBills, color: "#5f8cff" },
          { label: "Total Amount", value: `₹${totalAmount}`, color: "#28a745" },
          { label: "Pending Amount", value: `₹${pendingAmount}`, color: "#ffc107" },
          { label: "Paid Amount", value: `₹${paidAmount}`, color: "#17a2b8" },
        ].map((card) => (
          <div key={card.label} style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderLeft: `4px solid ${card.color}`,
          }}>
            <p style={{ color: "#777", fontSize: "13px" }}>{card.label}</p>
            <p style={{ fontSize: "22px", fontWeight: "bold", color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Create Bill Form */}
      <div className="billing-form">
        <h3 style={{ marginBottom: "15px" }}>Create New Bill</h3>
        <p className="sub-text">Fill in the details to create a bill</p>

        {msg && (
          <div style={{
            color: msg.includes("success") ? "green" : "red",
            textAlign: "center",
            marginBottom: "10px"
          }}>
            {msg}
          </div>
        )}

        <select name="patientId" value={data.patientId} onChange={handleChange}>
          <option value="" disabled>--- Select Patient ---</option>
          {patients && patients.map((pat) => (
            <option key={pat._id} value={pat.patientId?._id}>
              {pat.name}
            </option>
          ))}
        </select>

        <select name="doctorId" value={data.doctorId} onChange={handleChange}>
          <option value="" disabled>--- Select Doctor ---</option>
          {doctors && doctors.map((doc) => (
            <option key={doc._id} value={doc.doctorId?._id}>
              {doc.name} - {doc.specialization} - ₹{doc.fee}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="noOfAppointments"
          placeholder="No of Appointments"
          value={data.noOfAppointments}
          onChange={handleChange}
        />

        <button onClick={bill}>Create Bill</button>
      </div>

      {/* Bills Table */}
      <div className="table-wrapper" style={{ marginTop: "20px" }}>
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Doctor Fee</th>
              <th>Appointment Fee</th>
              <th>No of Appointments</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No bills found
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.patientName}</td>
                  <td>Dr. {bill.doctorName}</td>
                  <td>₹{bill.doctorFee}</td>
                  <td>₹{bill.appointmentFee}</td>
                  <td>{bill.noOfAppointments}</td>
                  <td>₹{bill.totalAmount}</td>
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
                  <td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {bill.status === "pending" && (
                        <button className="btn edit"
                          onClick={() => handleStatusUpdate(bill._id, "paid")}>
                          Mark Paid
                        </button>
                      )}
                      {bill.status === "paid" && (
                        <button className="btn edit"
                          onClick={() => handleStatusUpdate(bill._id, "pending")}>
                          Mark Pending
                        </button>
                      )}
                      <button className="btn delete"
                        onClick={() => handleDelete(bill._id)}>
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
  )
}

export default Billing