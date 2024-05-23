import React, { useState } from "react";
import "./Header.css";
import logo from "./logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="landingPageHeader">
      <img src={logo} alt="FitBuddy Hero 1" className="logo" />
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/registration">Sign Up</a>
        <a href="/login">Login</a>
        <a href="#contact">Contact Us</a>
      </nav>
    </header>
  );
}

export default Header;
