import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

let Patientprescriptions = () => {
  let email = localStorage.getItem("email");
  let name = localStorage.getItem("name");
  let [prescriptions, setPrescriptions] = useState([]);
  let [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/prescription/getpatientprescriptions/${email}`)
      .then((res) => {
        setPrescriptions(res.data.prescriptions || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDownload = (pre) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(63, 131, 248);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Hospital Management System", 105, 18, { align: "center" });
    doc.setFontSize(12);
    doc.text("Medical Prescription", 105, 30, { align: "center" });

    // Reset color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    // Patient and Doctor Info
    doc.setFont("helvetica", "bold");
    doc.text("Patient Name:", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(pre.patientName || name, 70, 55);

    doc.setFont("helvetica", "bold");
    doc.text("Doctor Name:", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.text(`Dr. ${pre.doctorName}`, 70, 65);

    doc.setFont("helvetica", "bold");
    doc.text("Date:", 20, 75);
    doc.setFont("helvetica", "normal");
    doc.text(pre.date || "", 70, 75);

    // Divider
    doc.setDrawColor(63, 131, 248);
    doc.setLineWidth(0.5);
    doc.line(20, 82, 190, 82);

    // Diagnosis
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Diagnosis", 20, 93);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(pre.diagnosis || "N/A", 20, 103);

    // Medicines
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Medicines", 20, 118);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    let medicineLines = doc.splitTextToSize(pre.medicines || "N/A", 170);
    doc.text(medicineLines, 20, 128);

    // Instructions
    let instructionY = 128 + medicineLines.length * 7 + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Instructions", 20, instructionY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    let instructionLines = doc.splitTextToSize(pre.instructions || "N/A", 170);
    doc.text(instructionLines, 20, instructionY + 10);

    // Footer
    doc.setFillColor(63, 131, 248);
    doc.rect(0, 275, 210, 22, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("This is a computer generated prescription.", 105, 284, { align: "center" });
    doc.text("Hospital Management System", 105, 291, { align: "center" });

    doc.save(`Prescription_${pre.patientName}_${pre.date}.pdf`);
  };

  return (
    <div className="doctor-container">
      <div className="page-header">
        <h2>My Prescriptions</h2>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      {prescriptions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
          <div style={{ fontSize: "50px" }}>💊</div>
          <p>No prescriptions found</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {prescriptions.map((pre) => (
            <div key={pre._id} style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #3f83f8"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <div>
                  <h3 style={{ margin: 0, color: "#333" }}>Dr. {pre.doctorName}</h3>
                  <p style={{ margin: "4px 0 0", color: "#777", fontSize: "13px" }}>{pre.date}</p>
                </div>
                <button
                  className="btn edit"
                  onClick={() => handleDownload(pre)}
                >
                  Download PDF
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
                <div style={{ background: "#f8f9fa", padding: "12px", borderRadius: "8px" }}>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px" }}>Diagnosis</p>
                  <p style={{ color: "#333", fontSize: "14px", margin: 0, fontWeight: "500" }}>{pre.diagnosis || "N/A"}</p>
                </div>
                <div style={{ background: "#f8f9fa", padding: "12px", borderRadius: "8px" }}>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px" }}>Medicines</p>
                  <p style={{ color: "#333", fontSize: "14px", margin: 0, fontWeight: "500" }}>{pre.medicines || "N/A"}</p>
                </div>
                <div style={{ background: "#f8f9fa", padding: "12px", borderRadius: "8px" }}>
                  <p style={{ color: "#777", fontSize: "12px", margin: "0 0 5px" }}>Instructions</p>
                  <p style={{ color: "#333", fontSize: "14px", margin: 0, fontWeight: "500" }}>{pre.instructions || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patientprescriptions;