import React, { useState } from "react";
import "./Header.css";
import logo from "./logo.png";
import { Link } from 'react-router-dom'; // Import Link from React Router


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className={`nav-tab ${menuOpen ? "open" : ""}`}>
    <Link to="/">Home</Link>
    <Link to="/contactus">Contact Us</Link>
    <Link to="/login">Login</Link>
    <Link to="/registration">Sign Up</Link>
      
      
    </nav>
  </header>
  );
}

export default Header;
