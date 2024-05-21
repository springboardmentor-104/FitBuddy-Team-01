import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth';
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Home() {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({ token: "" });
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
  }

  return (
    <div>
      <ToastContainer/>
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <Link exact to="/" className="nav-logo">
          FIT BUDDY
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                ContactUs
              </Link>
            </li>
            {!auth.token?(<>
            <li className="nav-item">
              <Link
                exact
                to="/login"
                activeClassName="active"
                className="nav-links btn btn-success"
                onClick={click ? handleClick : null}
              >
               Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/registration"
                activeClassName="active"
                className="nav-links btn btn-danger"
               onClick={click ? handleClick : null}
              >
                SignUp
              </Link>
            </li></>):(
              <>
              <li className="nav-item">
              <button
                activeClassName="active"
                className="nav-links btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
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
    </ div>
  );
}

export default Home;
