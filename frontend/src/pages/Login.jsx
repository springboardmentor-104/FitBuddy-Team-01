
import React, { useState } from "react";
import bgImg from "./../Assets/LoginPage.jpg";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';
const Login = (props) => {
  const navigate = useNavigate();

  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Check email validity
    setEmailValid(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Check password validity
    setPasswordValid(event.target.value.length >= 6); // Password should be at least 6 characters long
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/login', { emailOrUsername:email, password });
        if (response.data.success) {
            if (response.data.verify) {
                toast.success(response.data.message);
                setAuth({
                  ...auth,
                  user:response.data.user,
                  token:response.data.token
              });
              console.log("auth")
              console.log(auth)
                localStorage.setItem("auth", JSON.stringify(response.data));
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {

                toast.error(response.data.message);
                const userId = response.data.user.userId;
                sessionStorage.setItem("auth", JSON.stringify(response.data));
                setTimeout(() => {
                    navigate(`/verify/${userId}`);
                }, 1000);
            }
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            toast.error(error.response.data.message);
        }
    }
};


  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section
      className="register d-flex align-items-center justify-content-center"
      style={{ height: window.innerHeight }}
      id="reg-sec"
    >
      <ToastContainer/>
      <div
        className="container px-lg-4 card card-body"
        style={{ height: window.innerHeight - 100, maxWidth: 800 }}
      >
        <div className="row h-100">
          <div className="col-sm-12 col-md-6">
            <div className="text-center p-3">
              <h1 className="h3" id="lg-lg">
                Fit Buddy
              </h1>
              <span>
                <h3 className="h4" id="lg-h4">
                  Login to your account!
                </h3>
              </span>
              <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  // {...register("Email Address")}
                  placeholder="Email Address"
                  required
                />
                {!emailValid && (
                  <p style={{ color: "red" }} id="warn">
                    Invalid email format
                  </p>
                )}

                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  // {...register("Full name")}
                  placeholder="Password"
                  required
                />
                {!passwordValid && (
                  <p style={{ color: "red" }} id="warn">
                    Password should be at least 6 characters long
                  </p>
                )}

                <Link to="/forgot-password" id="fg-ps">
                  Forgot your password?
                </Link>
                <button className="btn btn-warning" id="btn-lg" type="submit">
                  Login to continue
                </button>
                <div className="text-left">
                  <small>
                    Don't have an account ?{" "}
                    <Link to="/Registration" id="sgn-up-lnk">
                      Sign Up
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-6 p-0">
            <img
              src={bgImg}
              alt={`Registration Page`}
              className="img-fluid rounded"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;