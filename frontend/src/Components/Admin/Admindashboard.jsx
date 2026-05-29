import Navbar from "../Common/Navbar"
import Sidebar from "../Admin/Adminsidebar"
import "./Admindashboard.css"
import Viewdoctor from "./Viewdoctor"
import { Outlet,useLocation} from "react-router-dom"
import Adminsidebar from "../Admin/Adminsidebar"
import {useState, useEffect} from "react"
import axios from "axios"
import AdminDashboardHome from "./AdminDashboardHome"
import DoctorReg from "../Doctor/DoctorReg"
import Viewpatient from "./Viewpatient"
import Bookappointment from "../Appointment/Bookappointment"
import Viewallappointment from "../Appointment/Viewallappointment"
import Cancelappointment from "../Appointment/Cancelappointment"
import Completedappointment from "../Appointment/Completedappointment"
import Scheduleappointmen from "../Appointment/Scheduleappointment"
import Billing from "../Billing/Billing"
import AdminReports from "./AdminReports"
import Scheduleappointment from "../Appointment/Scheduleappointment"


// let Admindashboard = () => {

//     const location = useLocation();

//     let [counts, setCounts] = useState({
//     doctors: 0,
//     patients: 0,
//     appointments: 0,
//     bills: 0
//   });

//   useEffect(() => {
//     // Fetch doctors count
//     axios.get("http://localhost:5000/getalldoctors").then((res) => {
//       let data = res.data.doctors || res.data;
//       setCounts((prev) => ({ ...prev, doctors: data.length }));
//     });

//     // Fetch patients count
//     axios.get("http://localhost:5000/getallpatients").then((res) => {
//       let data = res.data.patients || res.data;
//       setCounts((prev) => ({ ...prev, patients: data.length }));
//     });

//     // Fetch appointments count
//     axios.get("http://localhost:5000/getallappointments").then((res) => {
//       let data = res.data.appointments || res.data;
//       setCounts((prev) => ({ ...prev, appointments: data.length }));
//     });

//     // Fetch bills count
//     axios.get("http://localhost:5000/billingroute/getallbills").then((res) => {
//       let data = res.data.bills || res.data;
//       setCounts((prev) => ({ ...prev, bills: data.length }));
//     });
//   }, []);


//     return (
//         <div className="app">

//             {/* SIDEBAR */}
//             <div className="admin-sidebar">
//                 <Adminsidebar />
//             </div>

//             {/* MAIN */}
//             <div className="admin-main">

//                 {/* NAVBAR */}
//                 <div className="admin-navbar">
//                     <Navbar />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="admin-content">

//                     {/* SHOW DASHBOARD ONLY ON MAIN ROUTE */}
//                     {location.pathname === "/admindashboard" && (

//                         <div className="dashboard-container">

//                             <h2 className="dashboard-title">
//                                 HMS Dashboard
//                             </h2>

//                             {/* CARDS */}
//                             <div className="dashboard-cards">

//                                 <div className="dashboard-card">
//                                     <div>
//                                         <p>Total Doctors</p>
//                                         <h1>{counts.doctors}</h1>
//                                     </div>

//                                     <span>👨‍⚕️</span>
//                                 </div>

//                                 <div className="dashboard-card">
//                                     <div>
//                                         <p>Total Patients</p>
//                                         <h1>{counts.patients}</h1>
//                                     </div>

//                                     <span>🧑</span>
//                                 </div>

//                                 <div className="dashboard-card">
//                                     <div>
//                                         <p>Appointments</p>
//                                         <h1>{counts.appointments}</h1>
//                                     </div>

//                                     <span>📅</span>
//                                 </div>

//                                 <div className="dashboard-card">
//                                     <div>
//                                         <p>Bills Generated</p>
//                                         <h1>{counts.bills}</h1>
//                                     </div>

//                                     <span>💳</span>
//                                 </div>

//                             </div>

//                             {/* CHART PLACEHOLDER */}
//                             <div className="chart-box">

//                                 <h3>Hospital Analytics</h3>

//                                 <div className="chart-placeholder">
//                                     📊 Charts Coming Soon
//                                 </div>

//                             </div>

//                         </div>
//                     )}

//                     {/* OTHER PAGES */}
//                     <Outlet />

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Admindashboard;


let Admindashboard = () => {

  let [activePage, setActivePage] = useState(
    "admindashboardhome"
  );

  const renderContent = () => {

    switch (activePage) {

      case "admindashboardhome":
        return <AdminDashboardHome />;

      /* DOCTORS */

      case "viewdoctor":
        return <Viewdoctor />;

      case "doctorregister":
        return <DoctorReg />;

      /* PATIENTS */

      case "viewpatient":
        return <Viewpatient />;

      /* APPOINTMENTS */

      case "bookappointment":
        return <Bookappointment />;

      case "viewallappointment":
        return <Viewallappointment />;

      case "pendingappointment":
        return <Scheduleappointment />;

      case "completedappointment":
        return <Completedappointment />;

      case "cancelledappointment":
        return <Cancelappointment/>;

      /* BILLING */

      case "billing":
        return <Billing />;

      /* REPORTS */

      case "report":
        return <AdminReports />;

      default:
        return (
          <div className="page-header">
            <h2>Coming Soon</h2>
          </div>
        );

    }

  };

  return (

    <div className="app">

      <div className="admin-sidebar">

        <Adminsidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

      </div>

      <div className="admin-main">

        <div className="admin-navbar">
          <Navbar />
        </div>

        <div className="admin-content">

          {renderContent()}

        </div>

      </div>

    </div>

  );

};

export default Admindashboard;