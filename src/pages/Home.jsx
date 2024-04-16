import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            FIT BUDDY
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  ContactUs
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="srch-btn"
              >
                Search
              </button>
            </form>
            <div className="lgn-sgn-btn">
              <Link
                to="/registration"
                className="btn btn-success"
                id="snup-btn"
              >
                SignUp
              </Link>
              <Link to="/login" className="btn btn-danger">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div id="abt-inf-cnt"></div>
        <div className="row" id="rw-1">
          <div className="col-8">
            <strong className="lnd-txt-1">SHAPE YOUR</strong>
            <br></br>
            <strong className="lnd-txt-1">IDEAL BODY</strong>
            <p className="lnd-pr">
              Motivate users with benefits and positive reinforcement, and offer
              modifications and progress tracking.
            </p>
          </div>
          <div className="col-8">
            <strong className="lnd-lnk-1">Get Started</strong>
            <strong className="lnd-lnk-2">Watch Demo</strong>
          </div>

          <div className="row">
            <div id="jn-us">
              <div className="col-12">
                <span>
                  Enhance user experince with healty nutrition tips, support
                  resources, and social elements.
                </span>
                <span className="jn-us-btn">Join Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" id="footer"></div>
    </div>
  );
};

export default Home;
