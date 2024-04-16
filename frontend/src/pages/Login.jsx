import "./Login.css";
import React from "react";
import { Link } from "react-router-dom";
import Login_image from "./../Assets/login page.jpg";

const Login = (props) => {
  return (
    <div className="container login_para bg-white">
      <div className="row d-flex align-item-center">
        <div className="col-12 col-md-6">
          <div className="">
            <h1 className="display-6 text-primary">Fit Buddy </h1>
            <p className="h3">Login to your account!</p>
            <br />
            <form action="">
              <div className="authetication">
                <label className="form-label text-secondary">
                  Email Address
                </label>
                <div className="input-box">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Youraddres@email.com"
                    required
                  />
                </div>
                <br />
                <label className="form-label text-secondary">Password</label>
                <div className="input-box">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="recover-password d-flex justify-content-end py-2">
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
            </form>
            <div className="d-flex justify-content-center py-3 mx-auto">
              <a href="#" className="btn btn-warning btn-lg" type="submit">
                Login to Continue
              </a>
            </div>
            <div className="register-member d-flex justify-content-start">
              Don't have an account? <Link to="/registration">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <img className="img img-fluid" src={Login_image} alt="Gym img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
