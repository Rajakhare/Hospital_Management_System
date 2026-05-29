import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

let PatientReports = () => {
  let email = localStorage.getItem("email");
  let name = localStorage.getItem("name");
  let [reports, setReports] = useState([]);
  let [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/report/getpatientreports/${email}`)
      .then((res) => {
        setReports(res.data.reports || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDownload = (rep) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(63, 131, 248);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Hospital Management System", 105, 18, { align: "center" });
    doc.setFontSize(12);
    doc.text("Medical Report", 105, 30, { align: "center" });

    // Reset color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    // Patient and Doctor Info
    doc.setFont("helvetica", "bold");
    doc.text("Patient Name:", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(rep.patientName || name, 70, 55);

    doc.setFont("helvetica", "bold");
    doc.text("Doctor Name:", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.text(`Dr. ${rep.doctorName}`, 70, 65);

    doc.setFont("helvetica", "bold");
    doc.text("Date:", 20, 75);
    doc.setFont("helvetica", "normal");
    doc.text(rep.date || "", 70, 75);

    doc.setFont("helvetica", "bold");
    doc.text("Amount:", 20, 85);
    doc.setFont("helvetica", "normal");
    doc.text(`₹${rep.amount || 0}`, 70, 85);

    // Divider
    doc.setDrawColor(63, 131, 248);
    doc.setLineWidth(0.5);
    doc.line(20, 92, 190, 92);

    // Diagnosis
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Diagnosis", 20, 103);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(rep.diagnosis || "N/A", 20, 113);

    // Medicines
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Medicines", 20, 128);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    let medicineLines = doc.splitTextToSize(rep.medicines || "N/A", 170);
    doc.text(medicineLines, 20, 138);

    // Instructions
    let instructionY = 138 + medicineLines.length * 7 + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Instructions", 20, instructionY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    let instructionLines = doc.splitTextToSize(rep.instructions || "N/A", 170);
    doc.text(instructionLines, 20, instructionY + 10);

    // Footer
    doc.setFillColor(63, 131, 248);
    doc.rect(0, 275, 210, 22, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("This is a computer generated report.", 105, 284, { align: "center" });
    doc.text("Hospital Management System", 105, 291, { align: "center" });

    doc.save(`Report_${rep.patientName}_${rep.date}.pdf`);
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>My Reports</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      {reports.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
          <div style={{ fontSize: "50px" }}>📋</div>
          <p>No reports found</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {reports.map((rep) => (
            <div key={rep._id} style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #3f83f8"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <div>
                  <h3 style={{ margin: 0, color: "#333" }}>Dr. {rep.doctorName}</h3>
                  <p style={{ margin: "4px 0 0", color: "#777", fontSize: "13px" }}>{rep.date}</p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{
                    background: "#e8f4fd",
                    color: "#3f83f8",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "bold"
                  }}>
                    ₹{rep.amount}
                  </span>
                  <button className="btn edit" onClick={() => handleDownload(rep)}>
                    Download PDF
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
                <div style={{ background: "#f8f9fa", padding: "12px", borderRadius: "8px" }}>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px" }}>Diagnosis</p>
                  <p style={{ color: "#333", fontSize: "14px", margin: 0, fontWeight: "500" }}>{rep.diagnosis || "N/A"}</p>
                </div>
                <div style={{ background: "#f8f9fa", padding: "12px", borderRadius: "8px" }}>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px" }}>Medicines</p>
                  <p style={{ color: "#333", fontSize: "14px", margin: 0, fontWeight: "500" }}>{rep.medicines || "N/A"}</p>
                </div>
                <div style={{ background: "#f8f9fa", padding: "12px", borderRadius: "8px" }}>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px" }}>Instructions</p>
                  <p style={{ color: "#333", fontSize: "14px", margin: 0, fontWeight: "500" }}>{rep.instructions || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientReports;