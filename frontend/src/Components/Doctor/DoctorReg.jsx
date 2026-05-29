import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./doctor.css"

let DoctorReg=()=> {
    let [data,setData] = useState({"name":"","email":"","password":"","age":"","gender":"","phone":"","specialization":"","experience":"","fee":"","availability":""})
    let [msg,setMsg] = useState("")
    let navigate = useNavigate()

    let fun=(e)=> {
        setData({...data,[e.target.name]:e.target.value})
    }

    let register=()=> {
        axios.post("http://localhost:5000/createdoctor",data).then((res)=> {
            if(res.data.msg=="Doctor Registered Successfully")
            {
                setMsg(res.data.msg)
                setData({"name":"","email":"","password":"","age":"","gender":"","phone":"","specialization":"","experience":"","fee":"","availability":""})
            }
            else {
                setMsg(res.data.msg)
            }
        },[])
    }
    return(
        <div className="form-container">
            <div className="form-card">
                <h2>{msg}</h2>
                 <h2>Doctor Registration</h2>
                <p 
                className="sub-text">Enter your details</p>
                
                <div className="form-grid">
                <input type="text" placeholder="Full Name" name="name" value={data.name} onChange={fun}/>
                <input type="email" placeholder="Email" name="email" value={data.email} onChange={fun}/>

                <input type="password" placeholder="Password" name="password" value={data.password} onChange={fun}/>
                <input type="number" placeholder="Age" name="age" value={data.age} onChange={fun}/>

                <input type="text" placeholder="Gender" name="gender" value={data.gender} onChange={fun}/>
                <input type="text" placeholder="Phone" name="phone" value={data.phone} onChange={fun}/>

                <input type="text" placeholder="Specialization" name="specialization" value={data.specialization} onChange={fun}/>
                <input type="number" placeholder="Experience" name="experience" value={data.experience} onChange={fun}/>

                <input type="number" placeholder="Fee" name="fee" value={data.fee} onChange={fun}/>
                <input type="text" placeholder="Availability" name="availability" value={data.availability} onChange={fun}/>
                </div>

                <button className="submit-btn" onClick={register}>Register</button>
            </div>
            </div>
    )
}
export default DoctorReg