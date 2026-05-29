import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "../Admin/Sidebar.css";

import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Receipt,
  User,
  Bell,
  LogOut,
  ClipboardList,
  HeartPulse,
} from "lucide-react";

const Patientsidebar = ({ activePage, setActivePage }) => {
  const [open, setOpen] = useState(null);
  let name = localStorage.getItem("name")

  const toggleMenu = (menu) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <div className="sidebar">

      {/* PROFILE */}
      <div className="profile">
        <div className="avatar">
          {name
            ? name.charAt(0).toUpperCase()
            : "?"}
        </div>
      </div>

      {/* MENU */}
      <div className="menu">

        {/* DASHBOARD */}
        <div
          className={`menu-item ${
            activePage === "patientdashboardhome" ? "active" : ""
          }`}
          onClick={() => setActivePage("patientdashboardhome")}
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
            <p onClick={() => setActivePage("bookappointment")}>
              Book Appointment
            </p>

            <p onClick={() => setActivePage("scheduledappointment")}>
              Scheduled Appointment
            </p>

            <p onClick={() => setActivePage("myappointments")}>
              My Appointment
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
            <p onClick={() => setActivePage("viewprescription")}>
              View Medicines
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
          </div>
        )}


        {/* BILLS */}
        <div
          className="menu-item"
          onClick={() => toggleMenu("bill")}
        >
          <Receipt size={18} />
          Bills / Payments
        </div>

        {open === "bill" && (
          <div className="submenu">
            <p onClick={() => setActivePage("pendingbills")}>
              Pending Bills
            </p>

            <p onClick={() => setActivePage("allbills")}>
              All Bills
            </p>

            <p onClick={() => setActivePage("paymenthistory")}>
              Payment History
            </p>
          </div>
        )}


        {/* PROFILE */}
        <div
          className={`menu-item ${
            activePage === "patienteditprofile" ? "active" : ""
          }`}
          onClick={() => setActivePage("patienteditprofile")}
        >
          <User size={18} />
          Edit Profile
        </div>

      </div>
    </div>
  );
};

export default Patientsidebar;