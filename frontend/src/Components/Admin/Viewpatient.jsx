import axios from "axios";
import { useEffect, useState } from "react";
import "./viewdoctor.css"
import { useParams } from "react-router-dom";

let Viewpatient = ()=> {
    let [patient, setPatients] = useState([])
    let [msg, setMsg] = useState("")
    let [f, setF] = useState(false)
    let {email} = useParams()

    useEffect(()=> {
        axios.get(`http://localhost:5000/getallpatients`).then((res)=> {
            setPatients(res.data)
        }).catch((err)=> {
            console.log(err)
            res.json(res.data.msg)
        })
    },[f])

    let handleDelete = (email)=> {
      axios.delete(`http://localhost:5000/deletepatient/${email}`).then((res)=> {
        alert(res.data.msg)
        setF(!f)
      }).catch((err)=> {
        console.log(err)
        setMsg(res.data.msg)
      })
    }

    return (
    <div className="doctor-container">
        <div className="page-header">
            <h2>Patient List</h2>
        </div>

      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>BloodGroup</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patient.map((pat) => (
              <tr>
                <td>{pat.patientId?.uniqueId}</td>
                <td>{pat.name}</td>
                <td>{pat.patientId?.email}</td>
                <td>{pat.age}</td>
                <td>{pat.gender}</td>
                <td>{pat.phone}</td>
                <td>{pat.bloodGroup}</td>
                <td>{pat.address}</td>
                <td>

                  <button
                    className="btn delete"
                    onClick={() => handleDelete(pat.patientId?.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Viewpatient