import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

let Cancelappointment = () => {
    let [data,setData] = useState([])
    let [msg,setMsg] = useState("")


    useEffect(()=> {
        axios.get(`http://localhost:5000/getappointmentbystatus/cancelled`).then((res)=> {
          setData(res.data.appointments || [])
          console.log("cancelled appointments", res.data.appointments)
        }).catch((err)=> {
            setMsg(res.data.msg)
            setData([])
        })
    },[])

    return(
      <div className="doctor-container">
        <div className="page-header">
            <h2>Cancel Appointments</h2>
        </div>

        <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>TimeSlot</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length>0&&data.map((obj) => (
              <tr>
                <td>{obj._id}</td>
                <td>{obj.patientName}</td>
                <td>Dr.{obj.doctorName}</td>
                {/* <td>{obj.date?.substring(0,10)}</td> */}
                <td>{obj.timeslot}</td>
                <td>{obj.reason}</td>
                <td>{obj.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
    )
}
export default Cancelappointment