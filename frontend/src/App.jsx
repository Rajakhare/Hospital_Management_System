import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Common/Login"
import Admindashboard from "./Components/Admin/Admindashboard"
import PatientReg from "./Components/Patient/PatientReg"
import Patientdashboard from "./Components/Patient/Patientdashboard"
import DoctorReg from "./Components/Doctor/DoctorReg"
import Doctordashboard from "./Components/Doctor/Doctordashboard"
import { useEffect, useState } from "react"
import Ct from "./Ct"
import Logout from "./Components/Common/Logout"
import Viewdoctor from "./Components/Admin/Viewdoctor"
import Viewpatient from "./Components/Admin/Viewpatient"
import Bookappointment from "./Components/Appointment/Bookappointment"
import Cancelappointment from "./Components/Appointment/Cancelappointment"
import Scheduleappointment from "./Components/Appointment/Scheduleappointment"
import Viewallappointment from "./Components/Appointment/Viewallappointment"
import Appointments from "./Components/Appointment/Appointments"
import Billing from "./Components/Billing/Billing"
import Editdoctor from "./Components/Admin/Editdoctor"
import Admindash from "./Components/Admin/Admindash"
import AdminReports from "./Components/Admin/AdminReports"

let App=()=> {
    let [state,setState] = useState({"token":"", "role":"", "email":"", "name":""})

    let updState=(obj)=> {
        setState(prev=>({...prev,...obj}))
    }

    return(
    <BrowserRouter>
    <Ct.Provider value={{state, updState}}>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admindashboard" element={<Admindashboard/>}>
            <Route path="viewdoctor" element={<Viewdoctor/>}/>
            <Route path="editdoctor" element={<Editdoctor/>}/>
            <Route path="doctorregister" element={<DoctorReg/>}/>
            <Route path="viewpatient" element={<Viewpatient/>}/>
            <Route path="bookappointment" element={<Bookappointment/>}/>
            <Route path="appointments/:status" element={<Appointments/>}/>
            <Route path="viewallappointment" element={<Viewallappointment/>}/>
            <Route path="billing" element={<Billing/>}/>
            <Route path="report" element={<AdminReports/>}/>
        </Route>
        <Route path="/patientregister" element={<PatientReg/>}/>
        <Route path="/patientdashboard" element={<Patientdashboard/>}/>
        <Route path="/doctordashboard" element=
        {<Doctordashboard/>}/>
        <Route path="/logout" element={<Logout/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
    )
}
export default App