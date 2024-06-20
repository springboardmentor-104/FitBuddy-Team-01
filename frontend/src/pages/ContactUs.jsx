import React from "react";
import "./ContactUs.css";
import { Link } from "react-router-dom";
import Header from "../landingPage/Header";
import "boxicons/css/boxicons.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ContactUs = () => {
  return (
    <div>
         <Header />
      <div className="ContactUs-container">
        <div className="Box">
          <h1 className="h1-1">Contact Us</h1>
          <br />
          <div className="row">
            <div className="col" style={{ paddingLeft: "0px" }}>
              <i className="bx bx-envelope"></i>
              <h1 className="h1-2">Email Us</h1>
              <Link
                to="mailto:fitbuddy@gmail.com"
                style={{
                  textDecoration: "none",
                  // fontSize: "14px",
                  fontSize: "15px",
                  margin: "10px 0",
                  color: "rgb(21 21 164 / 80%)",
                  fontWeight: "600",
                }}
              >
                fitbuddy@gmail.com
              </Link>
            </div>
            <div className="col" style={{ paddingLeft: "0px" }}>
              <i className="bx bx-phone-call"></i>
              <h1 className="h1-2">Call</h1>
              <p
                style={{
                  // fontSize: "14px",
                  fontSize: "15px",
                  color: "rgb(21 21 164 / 80%)",
                  fontWeight: "600",
                  marginBottom: "0px",
                }}
              >
                +91-0000000000
              </p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col" style={{ paddingLeft: "0px" }}>
              <h1 className="h1-2">Visit</h1>
              <p style={{ marginBottom: "0px" }}>
                <Link
                  to="http://localhost:3000/"
                  style={{
                    textDecoration: "none",
                    // fontSize: "14px",
                    fontSize: "15px",
                    color: "rgb(21 21 164 / 80%)",
                    fontWeight: "600",
                  }}
                >
                  www.fitbuddy.com
                </Link>
              </p>
            </div>
            <div className="col" style={{ paddingLeft: "0px" }}>
              <h1 className="h1-2">Social Links</h1>
              <span className="icon-container">
                <Link to="https://x.com/">
                  <i class="bi bi-twitter"></i>
                </Link>
              </span>
              <span className="icon-container">
                <Link to="#">
                  <i class="bi bi-linkedin"></i>
                </Link>
              </span>
              <span className="icon-container">
                <Link to="#">
                  <i class="bi bi-instagram"></i>
                </Link>
              </span>
              <span className="icon-container">
                <Link to="#">
                  <i class="bi bi-facebook"></i>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
