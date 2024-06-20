import React, { useEffect, useState } from "react";
import "./MainContent.css";
import heroImage1 from "./Left_side.jpg";
import heroImage2 from "./Fitbuddy_landing_right_side_image.jpg";
import Header from "./Header"
import { Link } from "react-router-dom";

function MainContent() {
  const [user, setUser] = useState()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [user])
  return (
    <>      <Header />

      <main className="main-content">
        <div className="hero">
          <div className="page1">
            <div className="hero1">
              <img
                src={heroImage1}
                alt="FitBuddy Hero 1"
                className="hero-image1"
              />
            </div>
            <div className="hero-text">
              <div className="text1">
                <h1>Get Your Dream Physique With Us</h1>
                <p>
                  In FitBuddy you get that motivation, consistency and dedication,
                  which can lead you to become anything you want. All you need do
                  is -
                </p>
                <div className="text2">
                  <h2>Get Up and Work out!</h2>
                  <button className="cta-button">
                    {user ? (
                      <Link to="/Userdashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
                    ) : (
                      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Let's Get Started!</Link>
                    )}</button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="page2">
            <div className="text2">
              <h2>Get Up and Work out!</h2>
              <button className="cta-button">
                <Link to="/login">Let's Get Started!</Link>
              </button>          </div>
          </div> */}
          <div className="hero2">
            <img src={heroImage2} alt="FitBuddy Hero 2" className="hero-image2" />
          </div>
        </div>
      </main>
    </>
  );
}

export default MainContent;
