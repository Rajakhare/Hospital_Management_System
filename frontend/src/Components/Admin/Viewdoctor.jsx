import axios from "axios";
import { useEffect, useState } from "react";
import "./viewdoctor.css"
import { useNavigate, useParams } from "react-router-dom";

let Viewdoctor = ()=> {
    let [doctors, setDoctors] = useState([])
    let [msg, setMsg] = useState("")
    let [f, setF] = useState(false)
    let {email} = useParams()
    let navigate = useNavigate()

    useEffect(()=> {
        axios.get("http://localhost:5000/getalldoctors").then((res)=> {
            setDoctors(res.data)
        }).catch((err)=> {
            console.log(err)
            res.json(res.data.msg)
        })
    },[f])

    let handleDelete = (email)=> {
        axios.delete(`http://localhost:5000/deletedoctor/${email}`).then((res)=> {
            alert(res.data.msg)
            setF(!f)
        }).catch((err)=> {
            console.log(err)
            setMsg(res.data.msg)
        })
    }

    let handleEdit=(doc)=> {
      navigate("/admindashboard/editdoctor", {state: {doctor:doc}})
    }

    return (
    <div className="doctor-container">
        <div className="page-header">
            <h2>Doctor List</h2>
        </div>

      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.doctorId?.uniqueId}</td>
                <td>Dr.{doc.name}</td>
                <td>{doc.doctorId?.email}</td>
                <td>{doc.specialization}</td>
                <td>{doc.experience} yrs</td>
                <td>₹{doc.fee}</td>
                <td>
                  <button
                    className="btn edit"
                    onClick={() => handleEdit(doc)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete"
                    onClick={() => handleDelete(doc.doctorId?.email)}
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
export default Viewdoctor