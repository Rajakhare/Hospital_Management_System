
import "./doctordashboardhome.css";
import { useEffect, useState } from "react";
import axios from "axios";

let Doctordashboardhome = () => {
  let email = localStorage.getItem("email");
  let name = localStorage.getItem("name");

  let [doctorProfile, setDoctorProfile] = useState({});
  let [pendingCount, setPendingCount] = useState(0);
  let [totalPatients, setTotalPatients] = useState(0);
  let [revenue, setRevenue] = useState(0);
  let [upcomingAppointments, setUpcomingAppointments] = useState([]);
  let [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch doctor profile
    axios.get(`http://localhost:5000/getdoctorbyemail/${email}`)
      .then((res) => {
        setDoctorProfile(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch doctor appointments
    axios.get(`http://localhost:5000/getdoctorappointments/${email}`)
      .then((res) => {
        let appointments = res.data.appointments || [];

        // Pending count
        let pending = appointments.filter((apt) => apt.status === "pending");
        setPendingCount(pending.length);

        // Upcoming appointments - pending and confirmed
        let upcoming = appointments.filter(
          (apt) => apt.status === "pending" || apt.status === "confirmed"
        ).slice(0, 5);
        setUpcomingAppointments(upcoming);

        // Recent activity
        let activity = appointments.slice(0, 4).map((apt) => {
          if (apt.status === "pending") return `📅 New appointment from ${apt.patientName}`;
          if (apt.status === "confirmed") return `✅ Appointment confirmed for ${apt.patientName}`;
          if (apt.status === "completed") return `💊 Appointment completed for ${apt.patientName}`;
          if (apt.status === "cancelled") return `❌ Appointment cancelled for ${apt.patientName}`;
          return `📅 Appointment for ${apt.patientName}`;
        });
        setRecentActivity(activity);
      })
      .catch((err) => console.log(err));

    // Fetch doctor patients count
    axios.get(`http://localhost:5000/getdoctorpatients/${email}`)
      .then((res) => {
        setTotalPatients(res.data.patients?.length || 0);
      })
      .catch((err) => console.log(err));

    // Fetch bills for revenue
    axios.get("http://localhost:5000/billingroute/getallbills")
      .then((res) => {
        let bills = res.data.bills || [];
        let paid = bills
          .filter((b) => b.status === "paid" && b.doctorName === doctorProfile.name)
          .reduce((sum, b) => sum + b.totalAmount, 0);
        setRevenue(paid);
      })
      .catch((err) => console.log(err));

  }, [email]);

  return (
    <div className="doctor-dashboard">

      {/* PROFILE CARD */}
      <div className="doctor-profile-card">
        <div className="doctor-left">
          <div className="doctor-avatar">
            {name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>Dr. {doctorProfile.name || name}</h2>
            <p>{doctorProfile.specialization || "Specialist"}</p>
            <span className="doctor-status">
              {doctorProfile.availability ? "Available Today" : "Not Available"}
            </span>
          </div>
        </div>
        <div className="doctor-right">
          <div className="mini-box">
            <h3>{doctorProfile.experience || 0}+</h3>
            <p>Years Exp.</p>
          </div>
          <div className="mini-box">
            <h3>₹{doctorProfile.fee || 0}</h3>
            <p>Fee</p>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="doctor-cards">
        <div className="doctor-card">
          <div>
            <p>Pending Appointments</p>
            <h1>{pendingCount}</h1>
          </div>
          <span>📅</span>
        </div>

        <div className="doctor-card">
          <div>
            <p>Total Patients</p>
            <h1>{totalPatients}</h1>
          </div>
          <span>🧑</span>
        </div>

        <div className="doctor-card">
          <div>
            <p>Revenue</p>
            <h1>₹{revenue}</h1>
          </div>
          <span>💳</span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="doctor-bottom-grid">

        {/* TABLE */}
        <div className="doctor-table-card">
          <h3>Upcoming Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "15px" }}>
                    No upcoming appointments
                  </td>
                </tr>
              ) : (
                upcomingAppointments.map((apt) => (
                  <tr key={apt._id}>
                    <td>{apt.patientName}</td>
                    <td>{apt.date?.substring(0, 10)}</td>
                    <td>
                      <span className={apt.status === "confirmed" ? "completed" : "pending"}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ACTIVITY */}
        <div className="activity-card">
          <h3>Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <div className="activity-item">No recent activity</div>
          ) : (
            recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                {activity}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Doctordashboardhome;