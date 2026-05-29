import { useContext } from "react";
import "./Navbar.css";
import Ct from "../../Ct";
import { Link } from "react-router-dom";

const Navbar = () => {
  let name = localStorage.getItem("name")
  
  return (
    <div className="navbar">
  
      {/* LEFT */}
      <div className="nav-left">
        <span className="welcome">Welcome, {name}</span>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link className="logout-btn"  to="/logout">Logout</Link>
      </div>

    </div>
  );
};

export default Navbar;