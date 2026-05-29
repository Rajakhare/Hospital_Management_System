// import { useContext, useState } from "react";
// import "../Admin/Sidebar.css"
// import Ct from "../../Ct";

// const Doctorsidebar = ({ activePage, setActivePage }) => {
//   let name = localStorage.getItem("name")
//   const [open, setOpen] = useState(null);
//   let { state } = useContext(Ct)

//   const toggleMenu = (menu) => {
//     setOpen(open === menu ? null : menu);
//   };

//   return (
//     <div className="sidebar">
//       <div className="profile">
//         <div className="avatar">{name ? name.charAt(0).toUpperCase() : "?"}</div>
//       </div>

//       <div className="menu">
//         <div
//           className={`menu-item ${activePage === "dashboard" ? "active" : ""}`}
//           onClick={() => setActivePage("dashboard")}
//         >
//           🏠 Dashboard
//         </div>

//         <div className="menu-item" onClick={() => toggleMenu("appointment")}>
//           Appointment
//         </div>
//         {open === "appointment" && (
//           <div className="submenu">
//             <p onClick={() => setActivePage("viewdoctorappointments")}>View Appointments</p>
//           </div>
//         )}

//         <div className="menu-item" onClick={() => toggleMenu("patient")}>
//           Patient
//         </div>
//         {open === "patient" && (
//           <div className="submenu">
//             <p onClick={() => setActivePage("viewpatientappointments")}>View Patients</p>
//           </div>
//         )}

//         <div className="menu-item" onClick={() => toggleMenu("prescription")}>
//           Prescription
//         </div>
//         {open === "prescription" && (
//           <div className="submenu">
//             <p onClick={() => setActivePage("addprescription")}>Add Prescriptions</p>
//             <p onClick={() => setActivePage("viewprescriptions")}>View Prescriptions</p>
//           </div>
//         )}

//         <div className="menu-item" onClick={() => toggleMenu("report")}>
//           Reports
//         </div>
//         {open === "report" && (
//           <div className="submenu">
//             <p onClick={() => setActivePage("viewreports")}>View Reports</p>
//             <p onClick={() => setActivePage("uploadreports")}>Upload Reports</p>
//           </div>
//         )}

//         <div
//           className={`menu-item ${activePage === "editprofile" ? "active" : ""}`}
//           onClick={() => setActivePage("editprofile")}
//         >
//           Edit Profile
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctorsidebar;


import { useContext, useState } from "react";
import "../Admin/Sidebar.css";
import Ct from "../../Ct";

import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  ClipboardList,
  User,
  Bell,
  LogOut,
} from "lucide-react";

const Doctorsidebar = ({ activePage, setActivePage }) => {
  let name = localStorage.getItem("name");

  const [open, setOpen] = useState(null);

  let { state } = useContext(Ct);

  const toggleMenu = (menu) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <div className="sidebar">

      {/* PROFILE */}
      <div className="profile">
        <div className="avatar">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>

        <h4>{state?.name}</h4>
      </div>

      {/* MENU */}
      <div className="menu">

        {/* DASHBOARD */}
        <div
          className={`menu-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        {/* APPOINTMENT */}
        <div
          className="menu-item"
          onClick={() => toggleMenu("appointment")}
        >
          <CalendarCheck size={18} />
          Appointment
        </div>

        {open === "appointment" && (
          <div className="submenu">
            <p onClick={() => setActivePage("viewdoctorappointments")}>
              View Appointments
            </p>
          </div>
        )}

        {/* PATIENT */}
        <div
          className="menu-item"
          onClick={() => toggleMenu("patient")}
        >
          <Users size={18} />
          Patient
        </div>

        {open === "patient" && (
          <div className="submenu">
            <p onClick={() => setActivePage("viewpatientappointments")}>
              View Patients
            </p>
          </div>
        )}

        {/* PRESCRIPTION */}
        <div
          className="menu-item"
          onClick={() => toggleMenu("prescription")}
        >
          <FileText size={18} />
          Prescription
        </div>

        {open === "prescription" && (
          <div className="submenu">
            <p onClick={() => setActivePage("addprescription")}>
              Add Prescriptions
            </p>

            <p onClick={() => setActivePage("viewprescriptions")}>
              View Prescriptions
            </p>
          </div>
        )}

        {/* REPORTS */}
        <div
          className="menu-item"
          onClick={() => toggleMenu("report")}
        >
          <ClipboardList size={18} />
          Reports
        </div>

        {open === "report" && (
          <div className="submenu">
            <p onClick={() => setActivePage("viewreports")}>
              View Reports
            </p>

            <p onClick={() => setActivePage("uploadreports")}>
              Upload Reports
            </p>
          </div>
        )}

        {/* EDIT PROFILE */}
        <div
          className={`menu-item ${
            activePage === "editprofile" ? "active" : ""
          }`}
          onClick={() => setActivePage("editprofile")}
        >
          <User size={18} />
          Edit Profile
        </div>
      </div>
    </div>
  );
};

export default Doctorsidebar;