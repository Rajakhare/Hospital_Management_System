import "../Doctor/Doctordashboardhome.css";
import { useEffect, useState } from "react";
import axios from "axios";

let PatientDashboardHome = () => {

  let email = localStorage.getItem("email");
  let name = localStorage.getItem("name");

  let [patientProfile, setPatientProfile] = useState({});
  let [appointments, setAppointments] = useState([]);
  let [upcomingAppointments, setUpcomingAppointments] = useState([]);
  let [prescriptions, setPrescriptions] = useState([]);
  let [pendingBills, setPendingBills] = useState(0);
  let [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {

    // Patient Profile
    axios.get(`http://localhost:5000/getpatientbyemail/${email}`)
      .then((res) => {
        setPatientProfile(res.data);
      })
      .catch((err) => console.log(err));

    // Patient Appointments
    axios.get(`http://localhost:5000/getpatientappointments/${email}`)
      .then((res) => {

        let data = res.data.appointments || [];

        setAppointments(data);

        // Upcoming appointments
        let upcoming = data.filter(
          (apt) =>
            apt.status === "pending" ||
            apt.status === "confirmed"
        ).slice(0, 5);

        setUpcomingAppointments(upcoming);

        // Recent Activity
        let activity = data.slice(0, 4).map((apt) => {

          if (apt.status === "pending") {
            return `📅 Appointment booked with Dr. ${apt.doctorName}`;
          }

          if (apt.status === "confirmed") {
            return `✅ Appointment confirmed by Dr. ${apt.doctorName}`;
          }

          if (apt.status === "completed") {
            return `💊 Consultation completed with Dr. ${apt.doctorName}`;
          }

          if (apt.status === "cancelled") {
            return `❌ Appointment cancelled with Dr. ${apt.doctorName}`;
          }

          return `📅 Appointment activity`;
        });

        setRecentActivity(activity);

      })
      .catch((err) => console.log(err));

    // Prescriptions
    axios.get(`http://localhost:5000/getprescriptionbypatient/${email}`)
      .then((res) => {
        setPrescriptions(res.data.prescriptions || []);
      })
      .catch((err) => console.log(err));

    // Bills
    axios.get(`http://localhost:5000/billingroute/getpatientbills/${email}`)
      .then((res) => {

        let bills = res.data.bills || [];

        let pending = bills.filter(
          (bill) => bill.status === "pending"
        );

        setPendingBills(pending.length);

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
            <h2>{patientProfile.name || name}</h2>

            <p>{patientProfile.gender || "Patient"}</p>

            <span className="patient-status">
              {patientProfile.age || 0} Years Old
            </span>
          </div>

        </div>

        <div className="doctor-right">

          <div className="mini-box">
            <h3>{appointments.length}</h3>
            <p>Total Visits</p>
          </div>

          <div className="mini-box">
            <h3>{prescriptions.length}</h3>
            <p>Prescriptions</p>
          </div>

        </div>

      </div>

      {/* CARDS */}

      <div className="doctor-cards">

        <div className="doctor-card">
          <div>
            <p>Upcoming Appointments</p>
            <h1>{upcomingAppointments.length}</h1>
          </div>
          <span>📅</span>
        </div>

        <div className="doctor-card">
          <div>
            <p>Total Prescriptions</p>
            <h1>{prescriptions.length}</h1>
          </div>
          <span>💊</span>
        </div>

        <div className="doctor-card">
          <div>
            <p>Pending Bills</p>
            <h1>{pendingBills}</h1>
          </div>
          <span>💳</span>
        </div>

      </div>

      {/* BOTTOM SECTION */}

      <div className="doctor-bottom-grid">

        {/* APPOINTMENTS TABLE */}

        <div className="doctor-table-card">

          <h3>Upcoming Appointments</h3>

          <table>

            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {upcomingAppointments.length === 0 ? (

                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "15px"
                    }}
                  >
                    No upcoming appointments
                  </td>
                </tr>

              ) : (

                upcomingAppointments.map((apt) => (

                  <tr key={apt._id}>

                    <td>Dr. {apt.doctorName}</td>

                    <td>
                      {apt.date?.substring(0, 10)}
                    </td>

                    <td>

                      <span
                        className={
                          apt.status === "confirmed"
                            ? "completed"
                            : "pending"
                        }
                      >
                        {apt.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="activity-card">

          <h3>Recent Activity</h3>

          {recentActivity.length === 0 ? (

            <div className="activity-item">
              No recent activity
            </div>

          ) : (

            recentActivity.map((activity, index) => (

              <div
                key={index}
                className="activity-item"
              >
                {activity}
              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

};

export default PatientDashboardHome;