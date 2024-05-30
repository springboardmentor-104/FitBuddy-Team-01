// import "./../Components/forgotpassword/forgotpassword.css";

import React from "react";
import axios from "axios";
import "./forgotpassword.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import clseye_icon from "./../Assets/clseye.png";
import opneye_icon from "./../Assets/opneye.png";
import OtpVrfo_icon from "./../Assets/otpvrfo.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = (props) => {
  // const [email, setEmail] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  // const [orignalOtp, setOrignalOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userId, setUserId] = useState("");

  const [height, setHeight] = useState(0);
  const onResize = useCallback(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Function to handle sending OTP
  const handleGetOTP = () => {
    // You can implement OTP sending logic here
    if (email !== "") {
      setShowOtpField(true);
    } else {
      alert("Email is required for OTP.");
    }
  };

  // Function to handle OTP confirmation
  const handleConfirmOTP = (e) => {
    e.preventDefault();
    // You can implement OTP confirmation logic here
    if (otp.trim() !== "") {
            setShowResetPassword(true);
            navigate(`/reset-password`, {
              state: {
                email: email,
                otp: otp,
                userId: userId,
              },
            });
    } else {
      setOtpError("OTP is required.");
    }
  };

  // Function to handle OTP resend
  const handleResendOTP = () => {
    // You can implement OTP resend logic here
  };

  console.log("show", showPassword);

  // ==================================================

  const [emailError, setEmailError] = useState("");

  // Function to validate email
  const validateEmail = (input) => {
    // Regular expression pattern for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);

    setEmailError("");

    // eslint-disable-next-line eqeqeq
    if (input != "" && !validateEmail(input)) {
      setEmailError("Please enter a valid Email Address.");
    }
  };

  // Function to handle form submission
  // const handleSubmit2 = (e) => {
  //   e.preventDefault();

  //   if (validateEmail(email)) {
  //     // Proceed with form submission
  //     console.log("Email is valid");
  //   } else {
  //     // Display error message or prevent form submission
  //     console.log("Email is not valid");
  //   }
  // };

  // =====================================================

  // const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Function to handle OTP change
  const handleOtpChange = (e) => {
    const input = e.target.value;
    setOtp(input);

    // Validate OTP length
    if (input.length > 6) {
      setOtpError("OTP should be maximum 6 digits");
    } else {
      setOtpError("");
    }
  };


  // ====================================================

  // Function to handle form submission
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    // Validate form before submission
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a your Email address for OTP");
    } else {
      // Proceed with form submission
      console.log("Form submitted:", { email });
      let data = JSON.stringify({
        email: email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/auth/forgot",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          handleGetOTP();
          setUserId(response?.data?.userId);
          toast.success(response.data.message)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // ====================================================

  return (
    <>
    <ToastContainer/>
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: window.innerHeight }}
        >
          <div className="card border-0" style={{ margin: "100px" }}>
            <div className="card-body p-0 bg-light shadow">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div ref={ref} className={`p-5`}>
                    <Link to="/Login">
                      <i className="fa fa-angle-left" id="lft-arw-icn">
                        &nbsp;Back to Login
                      </i>
                    </Link>
                    <br />
                    <br />
                    <h1 id="frg-pwd-txt">Forgot your Password?</h1>
                    <p id="frg-pwd-msg">
                      Don't worry, happens to all of us. Enter your{" "}
                      {showOtpField ? "OTP" : "Email"} below to recover your
                      password.
                    </p>
                    {!showOtpField && (
                      <form action="" onSubmit={handleSubmit1}>
                        <div>
                          <input
                            name=""
                            id="email"
                            type="email"
                            value={email}
                            className="eml-inp"
                            placeholder="Email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              handleEmailChange(e);
                            }}
                            required
                          />
                          {emailError && (
                            <p style={{ color: "red" }}>{emailError}</p>
                          )}
                          <button
                            id="otp-btn"
                            type="submit"
                            className="btn btn-primary"
                          >
                            Get OTP
                          </button>
                        </div>
                      </form>
                    )}
                    {showOtpField && (
                      <form action="" onSubmit={handleConfirmOTP}>
                        <div>
                          <p id="aut-msg">
                            An authentication code has been sent to your email.
                          </p>
                          <div>
                            <div className="otp-bx">
                              <input
                                name=""
                                required
                                value={otp}
                                minLength={6}
                                maxLength={8}
                                id="password"
                                // pattern="[0 - 9]*"
                                placeholder="Enter OTP"
                                onChange={(e) => {
                                  setOtp(e.target.value);
                                  handleOtpChange(e);
                                }}
                                type={showPassword ? "text" : "password"}
                              />
                              <img
                                src={showPassword ? opneye_icon : clseye_icon}
                                alt=""
                                className="img-fluid"
                                id="eyeicon"
                                onClick={() => {
                                  setShowPassword(!showPassword);
                                }}
                              />
                            </div>
                            {otpError && (
                              <p style={{ color: "red" }}>{otpError}</p>
                            )}
                            <p id="nt-rc-pr">
                              <span>Didn't recieve a Code?</span>
                              <button
                                type="button"
                                id="rsnd"
                                onClick={handleResendOTP}
                              >
                                Resend
                              </button>
                            </p>
                            <button
                              type="submit"
                              className="btn btn-success"
                              id="otp-btn"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                <div className="d-sm-none d-md-block col-md-6 border-start">
                  <div className="p-5">
                    <img
                      src={OtpVrfo_icon}
                      alt={`Asf`}
                      className="rounded-0"
                      style={{ maxHeight: height, width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
