
import { useEffect, useState } from "react";
import axios from "axios";
import "../Doctor/Doctordashboardhome.css"

// let AdminDashboardHome = () => {

//   let name = localStorage.getItem("name");

//   let [totalDoctors, setTotalDoctors] = useState(0);
//   let [totalPatients, setTotalPatients] = useState(0);
//   let [totalAppointments, setTotalAppointments] = useState(0);
//   let [totalRevenue, setTotalRevenue] = useState(0);

//   let [pendingDoctors, setPendingDoctors] = useState(0);
//   let [pendingAppointments, setPendingAppointments] = useState(0);

//   let [recentActivity, setRecentActivity] = useState([]);
//   let [latestAppointments, setLatestAppointments] = useState([]);

//   useEffect(() => {

//     // Doctors
//     axios.get("http://localhost:5000/getalldoctors")
//       .then((res) => {

//         let doctors = res.data.doctors || [];

//         setTotalDoctors(doctors.length);

//         let pending = doctors.filter(
//           (doc) => doc.status === "pending"
//         );

//         setPendingDoctors(pending.length);

//       })
//       .catch((err) => console.log(err));

//     // Patients
//     axios.get("http://localhost:5000/getallpatients")
//       .then((res) => {

//         let patients = res.data.patients || [];

//         setTotalPatients(patients.length);

//       })
//       .catch((err) => console.log(err));

//     // Appointments
//     axios.get("http://localhost:5000/getallappointments")
//       .then((res) => {

//         let appointments = res.data.appointments || [];

//         setTotalAppointments(appointments.length);

//         // Pending Appointments
//         let pending = appointments.filter(
//           (apt) => apt.status === "pending"
//         );

//         setPendingAppointments(pending.length);

//         // Latest Appointments
//         setLatestAppointments(
//           appointments.slice(0, 5)
//         );

//         // Recent Activity
//         let activity = appointments
//           .slice(0, 5)
//           .map((apt) => {

//             if (apt.status === "pending") {
//               return `📅 New appointment booked by ${apt.patientName}`;
//             }

//             if (apt.status === "confirmed") {
//               return `✅ Appointment confirmed for ${apt.patientName}`;
//             }

//             if (apt.status === "completed") {
//               return `💊 Consultation completed`;
//             }

//             if (apt.status === "cancelled") {
//               return `❌ Appointment cancelled`;
//             }

//             return `📅 Appointment Activity`;
//           });

//         setRecentActivity(activity);

//       })
//       .catch((err) => console.log(err));

//     // Revenue
//     axios.get("http://localhost:5000/billingroute/getallbills")
//       .then((res) => {

//         let bills = res.data.bills || [];

//         let paidRevenue = bills
//           .filter((bill) => bill.status === "paid")
//           .reduce(
//             (sum, bill) => sum + bill.totalAmount,
//             0
//           );

//         setTotalRevenue(paidRevenue);

//       })
//       .catch((err) => console.log(err));

//   }, []);

//   return (

//     <div className="admin-dashboard">

//       {/* PROFILE CARD */}

//       <div className="admin-profile-card">

//         <div className="admin-left">

//           <div className="admin-avatar">
//             {name?.charAt(0).toUpperCase()}
//           </div>

//           <div>
//             <h2>Welcome Admin</h2>

//             <p>Hospital Management System</p>

//             <span className="admin-status">
//               System Active
//             </span>
//           </div>

//         </div>

//         <div className="admin-right">

//           <div className="mini-box">
//             <h3>{totalDoctors}</h3>
//             <p>Doctors</p>
//           </div>

//           <div className="mini-box">
//             <h3>{totalPatients}</h3>
//             <p>Patients</p>
//           </div>

//         </div>

//       </div>

//       {/* STATS CARDS */}

//       <div className="admin-cards">

//         <div className="admin-card">
//           <div>
//             <p>Total Appointments</p>
//             <h1>{totalAppointments}</h1>
//           </div>
//           <span>📅</span>
//         </div>

//         <div className="admin-card">
//           <div>
//             <p>Total Revenue</p>
//             <h1>₹{totalRevenue}</h1>
//           </div>
//           <span>💳</span>
//         </div>

//         <div className="admin-card">
//           <div>
//             <p>Pending Doctors</p>
//             <h1>{pendingDoctors}</h1>
//           </div>
//           <span>🩺</span>
//         </div>

//         <div className="admin-card">
//           <div>
//             <p>Pending Appointments</p>
//             <h1>{pendingAppointments}</h1>
//           </div>
//           <span>⏳</span>
//         </div>

//       </div>

//       {/* BOTTOM GRID */}

//       <div className="admin-bottom-grid">

//         {/* APPOINTMENTS TABLE */}

//         <div className="admin-table-card">

//           <h3>Latest Appointments</h3>

//           <table>

//             <thead>
//               <tr>
//                 <th>Patient</th>
//                 <th>Doctor</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>

//               {latestAppointments.length === 0 ? (

//                 <tr>
//                   <td
//                     colSpan="3"
//                     style={{
//                       textAlign: "center",
//                       padding: "15px"
//                     }}
//                   >
//                     No appointments found
//                   </td>
//                 </tr>

//               ) : (

//                 latestAppointments.map((apt) => (

//                   <tr key={apt._id}>

//                     <td>{apt.patientName}</td>

//                     <td>
//                       Dr. {apt.doctorName}
//                     </td>

//                     <td>

//                       <span
//                         className={
//                           apt.status === "confirmed"
//                             ? "completed"
//                             : "pending"
//                         }
//                       >
//                         {apt.status}
//                       </span>

//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//           </table>

//         </div>

//         {/* RECENT ACTIVITY */}

//         <div className="activity-card">

//           <h3>Recent Activity</h3>

//           {recentActivity.length === 0 ? (

//             <div className="activity-item">
//               No recent activity
//             </div>

//           ) : (

//             recentActivity.map((activity, index) => (

//               <div
//                 key={index}
//                 className="activity-item"
//               >
//                 {activity}
//               </div>

//             ))

//           )}

//         </div>

//       </div>

//     </div>

//   );

// };

// export default AdminDashboardHome;


let AdminDashboardHome = () => {

  let name = localStorage.getItem("name");

  let [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    bills: 0,
  });

  let [recentActivity, setRecentActivity] =
    useState([]);

  let [latestAppointments, setLatestAppointments] =
    useState([]);

  useEffect(() => {

    // DOCTORS

    axios
      .get("http://localhost:5000/getalldoctors")
      .then((res) => {

        let doctors =
          res.data.doctors || res.data || [];

        setCounts((prev) => ({
          ...prev,
          doctors: doctors.length,
        }));

      });

    // PATIENTS

    axios
      .get("http://localhost:5000/getallpatients")
      .then((res) => {

        let patients =
          res.data.patients || res.data || [];

        setCounts((prev) => ({
          ...prev,
          patients: patients.length,
        }));

      });

    // APPOINTMENTS

    axios
      .get("http://localhost:5000/getallappointments")
      .then((res) => {

        let appointments =
          res.data.appointments || [];

        setCounts((prev) => ({
          ...prev,
          appointments:
            appointments.length,
        }));

        setLatestAppointments(
          appointments.slice(0, 5)
        );

        let activity = appointments
          .slice(0, 4)
          .map((apt) => {

            if (apt.status === "pending") {
              return `📅 New appointment by ${apt.patientName}`;
            }

            if (apt.status === "confirmed") {
              return `✅ Appointment confirmed`;
            }

            if (apt.status === "completed") {
              return `💊 Appointment completed`;
            }

            return `📅 Appointment activity`;

          });

        setRecentActivity(activity);

      });

    // BILLS

    axios
      .get(
        "http://localhost:5000/billingroute/getallbills"
      )
      .then((res) => {

        let bills =
          res.data.bills || [];

        setCounts((prev) => ({
          ...prev,
          bills: bills.length,
        }));

      });

  }, []);

  return (

    <div className="doctor-dashboard">

      {/* PROFILE CARD */}

      <div className="doctor-profile-card">

        <div className="doctor-left">

          <div className="doctor-avatar">

            {
              name
                ? name.charAt(0).toUpperCase()
                : "A"
            }

          </div>

          <div>

            <h2>{name || "Admin"}</h2>

            <p>Hospital Administrator</p>

            <span className="doctor-status">
              System Active
            </span>

          </div>

        </div>

        <div className="doctor-right">

          <div className="mini-box">
            <h3>{counts.doctors}</h3>
            <p>Doctors</p>
          </div>

          <div className="mini-box">
            <h3>{counts.patients}</h3>
            <p>Patients</p>
          </div>

        </div>

      </div>

      {/* CARDS */}

      <div className="doctor-cards">

        <div className="doctor-card">

          <div>
            <p>Appointments</p>
            <h1>{counts.appointments}</h1>
          </div>

          <span>📅</span>

        </div>

        <div className="doctor-card">

          <div>
            <p>Total Doctors</p>
            <h1>{counts.doctors}</h1>
          </div>

          <span>👨‍⚕️</span>

        </div>

        <div className="doctor-card">

          <div>
            <p>Total Patients</p>
            <h1>{counts.patients}</h1>
          </div>

          <span>🧑</span>

        </div>

        <div className="doctor-card">

          <div>
            <p>Bills Generated</p>
            <h1>{counts.bills}</h1>
          </div>

          <span>💳</span>

        </div>

      </div>

      {/* BOTTOM GRID */}

      <div className="doctor-bottom-grid">

        {/* TABLE */}

        <div className="doctor-table-card">

          <h3>Latest Appointments</h3>

          <table>

            <thead>

              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {
                latestAppointments.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        padding: "15px",
                      }}
                    >
                      No appointments
                    </td>

                  </tr>

                ) : (

                  latestAppointments.map((apt) => (

                    <tr key={apt._id}>

                      <td>{apt.patientName}</td>

                      <td>
                        Dr. {apt.doctorName}
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

                )
              }

            </tbody>

          </table>

        </div>

        {/* ACTIVITY */}

        <div className="activity-card">

          <h3>Recent Activity</h3>

          {
            recentActivity.length === 0 ? (

              <div className="activity-item">
                No recent activity
              </div>

            ) : (

              recentActivity.map((item, index) => (

                <div
                  key={index}
                  className="activity-item"
                >
                  {item}
                </div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

};

export default AdminDashboardHome;