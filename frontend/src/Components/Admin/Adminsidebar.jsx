
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "./Sidebar.css";
import {
  LayoutDashboard,
  CalendarCheck,
  Receipt,
  User,
  ClipboardList,
  Stethoscope,
  Users,
  BarChart3,
} from "lucide-react";


const Adminsidebar = ({
  activePage,
  setActivePage,
}) => {

  const [open, setOpen] = useState(null);

  let name = localStorage.getItem("name");

  const toggleMenu = (menu) => {
    setOpen(
      open === menu
        ? null
        : menu
    );
  };

  return (

    <div className="sidebar">

      {/* PROFILE */}

      <div className="profile">

        <div className="avatar">

          {
            name
              ? name.charAt(0).toUpperCase()
              : "A"
          }

        </div>

      </div>

      {/* MENU */}

      <div className="menu">

        {/* DASHBOARD */}

        <div
          className={`menu-item ${
            activePage === "admindashboardhome"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("admindashboardhome")
          }
        >

          <LayoutDashboard size={18} />

          Dashboard

        </div>

        {/* DOCTORS */}

        <div
          className="menu-item"
          onClick={() => toggleMenu("doctor")}
        >

          <Stethoscope size={18} />

          Doctors

        </div>

        {
          open === "doctor" && (

            <div className="submenu">

              <p
                onClick={() =>
                  setActivePage("viewdoctor")
                }
              >
                View Doctors
              </p>

              <p
                onClick={() =>
                  setActivePage("doctorregister")
                }
              >
                Register Doctor
              </p>

            </div>

          )
        }

        {/* PATIENTS */}

        <div
          className="menu-item"
          onClick={() => toggleMenu("patient")}
        >

          <Users size={18} />

          Patients

        </div>

        {
          open === "patient" && (

            <div className="submenu">

              <p
                onClick={() =>
                  setActivePage("viewpatient")
                }
              >
                View Patients
              </p>

            </div>

          )
        }

        {/* APPOINTMENTS */}

        <div
          className="menu-item"
          onClick={() =>
            toggleMenu("appointment")
          }
        >

          <CalendarCheck size={18} />

          Appointments

        </div>

        {
          open === "appointment" && (

            <div className="submenu">

              <p
                onClick={() =>
                  setActivePage("bookappointment")
                }
              >
                Book Appointment
              </p>

              <p
                onClick={() =>
                  setActivePage("viewallappointment")
                }
              >
                All Appointments
              </p>

              <p
                onClick={() =>
                  setActivePage("pendingappointment")
                }
              >
                Pending Appointments
              </p>

              <p
                onClick={() =>
                  setActivePage("completedappointment")
                }
              >
                Completed Appointments
              </p>

              <p
                onClick={() =>
                  setActivePage("cancelledappointment")
                }
              >
                Cancelled Appointments
              </p>

            </div>

          )
        }

        {/* BILLING */}

        <div
          className="menu-item"
          onClick={() => toggleMenu("bill")}
        >

          <Receipt size={18} />

          Billing

        </div>

        {
          open === "bill" && (

            <div className="submenu">

              <p
                onClick={() =>
                  setActivePage("billing")
                }
              >
                All Bills
              </p>

            </div>

          )
        }

        {/* REPORT */}

        <div
          className={`menu-item ${
            activePage === "report"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("report")
          }
        >

          <BarChart3 size={18} />

          Reports

        </div>

      </div>

    </div>

  );

};

export default Adminsidebar;
