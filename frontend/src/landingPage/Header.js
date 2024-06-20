import React, { useState ,useEffect} from "react";
import "./Header.css";
import logo from "./logo.png";
import { Link } from "react-router-dom"; // Import Link from React Router
import {useAuth} from '../context/auth'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="landingPageHeader">
      <Link to="/">
        <img src={logo} alt="FitBuddy Hero 1" className="LandingLogo" />
      </Link>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`gau-nav ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/contactus">Contact Us</Link>
        {auth.token ? (<Link to="/" onClick={() => {
            setAuth({ token: "" });
            localStorage.removeItem("user");
            localStorage.removeItem("chartData");
          }}>Sign Out</Link>) :
          (<><Link to="/login">Login</Link><Link to="/registration">Sign Up</Link></>)}
        
      </nav>
    </header>
  );
}

export default Header;
