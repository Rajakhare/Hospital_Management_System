import Navbar from "../Common/Navbar"
import DoctorAppointments from "./DoctorAppointment"
import Doctorsidebar from "./Doctorsidebar"
import Editprofile from "./Editprofile"
import { useState } from "react"
import DoctorPatients from "./Doctorpatients"
import AddPrescription from "./Addprescription"
import ViewPrescriptions from "./Viewprescription"
import Doctordashboardhome from "./Doctordashboardhome"
import UploadReport from "./UploadReport"
import ViewReports from "./ViewReports"

let Doctordashboard = () => {
  let [activePage, setActivePage] = useState("dashboard")

  const renderContent = () => {
    console.log("activePage", activePage)
    switch (activePage) {
      case "dashboard": return <Doctordashboardhome/>
      case "editprofile": return <Editprofile />
      case "viewdoctorappointments":return <DoctorAppointments/>
      case "viewpatientappointments":return <DoctorPatients/>
      case "addprescription": return <AddPrescription/>
      case "viewprescriptions": return <ViewPrescriptions/>
      case "uploadreports": return <UploadReport/>
      case "viewreports": return <ViewReports/>
      default: return <div className="page-header"><h2>Coming Soon</h2></div>
    }
  }

  return (
    <div className="app">
      <div className="admin-sidebar">
        <Doctorsidebar activePage={activePage} setActivePage={setActivePage} />
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
  )
}

export default Doctordashboard