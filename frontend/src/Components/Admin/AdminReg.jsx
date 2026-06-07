import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

let AdminReg = () => {
    let navigate = useNavigate()
    let [form, setForm] = useState({
        name: "", email: "", password: ""
    })
    let [msg, setMsg] = useState("")

    let handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    let handleSubmit = async () => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_API_URL}/createadmin`, form)
            setMsg(res.data.msg)
            if (res.data.msg === "Admin Created Successfully") {
                setTimeout(() => navigate("/"), 2000)
            }
        } catch (err) {
            setMsg("Something went wrong!")
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ padding: "30px", border: "1px solid #ccc", borderRadius: "10px", width: "350px" }}>
                <h2>Admin Registration</h2>
                <input type="text" name="name" placeholder="Name"
                    onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
                <input type="email" name="email" placeholder="Email"
                    onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
                <input type="password" name="password" placeholder="Password"
                    onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
                <button onClick={handleSubmit}
                    style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
                    Register Admin
                </button>
                {msg && <p style={{ marginTop: "10px", color: "green" }}>{msg}</p>}
            </div>
        </div>
    )
}

export default AdminReg