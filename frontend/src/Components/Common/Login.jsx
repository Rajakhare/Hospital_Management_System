import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {Link} from "react-router-dom"
import "./Login.css"
import Ct from "../../Ct"


let Login=()=> {
    let [data,setData] = useState({"email":"", "password":""})
    let [msg,setMsg] = useState("")
    let navigate = useNavigate()
    let {state, updState} = useContext(Ct)

    let fun=(e)=> {
        setData({...data,[e.target.name]:e.target.value})
    }

    let login=()=> {
        axios.post("http://localhost:5000/login",data).then((res)=> {
            // console.log(res.data.msg)
            if(!res.data.msg) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("name", res.data.name)
                if(res.data.role=="admin") {
                    console.log(res.data)
                    updState({"token":res.data.token, "role":res.data.role, "email":res.data.email, "name":res.data.name})
                    navigate("/admindashboard")
                }
                else if(res.data.role=="patient") {
                    updState({"token":res.data.token, "role":res.data.role, "email":res.data.email, "name":res.data.name})
                    navigate("/patientdashboard")
                }
                else if(res.data.role=="doctor") {
                    updState({"token":res.data.token, "role":res.data.role, "email":res.data.email, "name":res.data.name})
                    navigate("/doctordashboard")
                }
            }
            else {
                setMsg(res.data.msg)
            }
        },[])
    }
    return(
        <div className="login-container">
            <div className="login-form">
                <h2 style={{"color":"blue"}}>Hospital Management System</h2>
                <h2>Welcome Back!</h2>
                {msg && <div className="error-msg">{msg}</div>}
                <p className="sub-text">Please enter your details</p>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" name="email" value={data.email} onChange={fun}required/>

                <label>Password</label>
                <div className="password-box">
                    <input type="password" placeholder="Enter Password" name="password" value={data.password} onChange={fun}required/>
                </div>
                <button className="login-btn" onClick={login}>Login</button>

            <div className="register">
                <p>Register as</p>
                <div className="register-buttons">
                    <Link to="/patientregister" className="patient">Patient</Link>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Login

