import Patientsidebar from "./Patientsidebar"
import Navbar from "../Common/Navbar"
import {useState} from "react"
import PatientEditProfile from "./PatientEditProfile"
import Bookappointment from "../Appointment/Bookappointment"
import Myappointments from "./Myappointments"
import Scheduledappointment from "./Scheduledappointment"
import Patientprescriptions from "./Patientprescriptions"
import PatientReports from "./PatientReports"
import PatientDashboardHome from "./PatientDashboardHome"
import PatientBills from "./PatientBills"
let Patientdashboard = () => {
  let [activePage, setActivePage] = useState("patientdashboardhome")

  const renderContent = () => {
    switch (activePage) {
      case "patientdashboardhome": return <PatientDashboardHome/>
      case "patienteditprofile": return <PatientEditProfile/>
      case "bookappointment": return <Bookappointment/>
      case "myappointments": return <Myappointments/>
      case "scheduledappointment": return <Scheduledappointment/>
      case "viewprescription": return <Patientprescriptions/>
      case "downloadprescription": return <Patientprescriptions/>
      case "viewreports": return <PatientReports/>
      case "downloadreports": return <PatientReports/>
      case "pendingbills": return <PatientBills status="pending"/>
      case "allbills": return <PatientBills status="all"/>
      case "paymenthistory": return <PatientBills status="paid"/>
      default: return <div className="page-header"><h2>Coming Soon</h2></div>
    }
  }

  return (
    <div className="app">
      <div className="admin-sidebar">
        <Patientsidebar activePage={activePage} setActivePage={setActivePage} />
      </div>
      <div className="admin-main">
        <div className="admin-navbar">
          <Navbar/>
        </div>
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Patientdashboard