import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Ct from "../../Ct"

let Logout=()=> {
    let navigate = useNavigate()
    let {state, updState} = useContext(Ct)
 
    useEffect(()=> {
        updState({"token":"", "role":"", "email":"", "name":""})
        navigate("/")
        
    },[])
}

export default Logout