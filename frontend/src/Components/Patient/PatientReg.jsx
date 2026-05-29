import { useContext, useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./patient.css"
import {Link} from "react-router-dom"
import Ct from "../../Ct"

let PatientReg=()=> {
    let [data,setData] = useState({})
    let [msg,setMsg] = useState("")
    let navigate =useNavigate()
    let {state} = useContext(Ct)

    let fun=(e)=> {
        setData({...data,[e.target.name]:e.target.value})
    }

    let register=()=> {
        axios.post("http://localhost:5000/createpatient",data).then((res)=> {
            if(res.data.msg=="Patient Registered Successfully") {
                navigate("/")
            }
            else {
                setMsg(res.data.msg)
            }
        }).catch((err)=> {
            console.log(err)
            setMsg("Error In Patient Registration")
        })
    }
    return(
       <div className="main">
            <div className="card">
                {msg && <div className="error-box">{msg}</div>}
                <h2>Patient Registration</h2>
                <p className="sub-text">Enter your details</p>

                <div className="form-grid">
                <input type="text" placeholder="Full Name" name="name" value={data.name} onChange={fun} required />

                <input type="email" placeholder="Email" name="email" value={data.email} onChange={fun} required />

                <input type="password" placeholder="Password" name="password" value={data.password} onChange={fun} required />

                <input type="text" placeholder="Age" name="age" value={data.age} onChange={fun} />

                <select name="gender" value={data.gender} onChange={fun}>
                    <option value="" disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <input type="text" placeholder="Phone" name="phone" value={data.phone} onChange={fun} />

                <select name="bloodGroup" value={data.bloodGroup} onChange={fun}>
                    <option value="Blood Group" disabled>Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                </div>

                <textarea 
                name="address" 
                value={data.address} 
                placeholder="Full Address" 
                onChange={fun}
                ></textarea>

                <button className="submit-btn" onClick={register}>
                Register
                </button>

                <div className="divider">OR</div>

                <Link className="google-btn" to="/">Login</Link>
            </div>
        </div>
    )
}
export default PatientReg