// import logo from "./logo.svg";
import "./App.css";

import OtpVrfo_icon from "../src/Components/Assets/otpvrfo.png";
import clseye_icon from "../src/Components/Assets/clseye.png";
import opneye_icon from "../src/Components/Assets/opneye.png";

import React, { useState, useRef, useEffect, useCallback } from "react";

function App() {
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [orignalOtp, setOrignalOtp] = useState(4545);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  const handleConfirmOTP = () => {
    // You can implement OTP confirmation logic here
    if (otp.trim() !== "") {
      if (orignalOtp.toString() === otp) {
        alert("OTP matched");
        setShowResetPassword(true);
      } else {
        setOtpError("Incorrect OTP");
      }
    } else {
      setOtpError("OTP is required.");
    }
  };

  // Function to handle OTP resend
  const handleResendOTP = () => {
    // You can implement OTP resend logic here
  };

  // Function to handle password reset
  const handleResetPassword = () => {
    // You can implement password reset logic here
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
      setEmailError("Please enter a valid email address");
    }
  };

  // Function to handle form submission
  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      // Proceed with form submission
      console.log("Email is valid");
    } else {
      // Display error message or prevent form submission
      console.log("Email is not valid");
    }
  };

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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length === 6) {
      // Proceed with form submission
      console.log("OTP is valid");
    } else {
      // Display error message or prevent form submission
      console.log("OTP is not valid");
    }
  };

  // ====================================================

  // Function to handle form submission
  const handleSubmit1 = (e) => {
    e.preventDefault();
    // Validate form before submission
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a your Email address for OTP");
    } else {
      // Proceed with form submission
      console.log("Form submitted:", { email });
    }
  };

  // ====================================================

  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: window.innerHeight }}
        >
          <div className="card border-0">
            <div className="card-body p-0 bg-light shadow">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div ref={ref} className={`p-5`}>
                    <a href="/">
                      <i className="fa fa-angle-left" id="lft-arw-icn">
                        &nbsp;Back to Login
                      </i>
                    </a>
                    <br />
                    <br />
                    <h1 id="frg-pwd-txt">Forgot your Password?</h1>
                    <p id="frg-pwd-msg">
                      Don't worry, happens to all of us. Enter your{" "}
                      {showOtpField ? "OTP" : "email"} below to recover your
                      password.
                    </p>

                    {!showOtpField && (
                      <form action="" onSubmit={handleSubmit1}>
                        <div>
                          <input
                            className="eml-inp"
                            id="email"
                            type="email"
                            value={email}
                            name=""
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
                            type="submit"
                            className="btn btn-primary"
                            id="otp-btn"
                            onClick={handleGetOTP}
                          >
                            Get OTP
                          </button>
                        </div>
                      </form>
                    )}

                    {showOtpField && (
                      <form action="">
                        <div>
                          <p id="aut-msg">
                            An authentication code has been sent to your email.
                          </p>
                          <div>
                            <div className="otp-bx">
                              <input
                                type={showPassword ? "text" : "password"}
                                name=""
                                placeholder="Enter OTP"
                                id="password"
                                value={otp}
                                onChange={(e) => {
                                  setOtp(e.target.value);
                                  handleOtpChange(e);
                                }}
                                maxLength={6} // Limit the input to 6 characters
                                required
                                // pattern={[0 - 9]}
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
                              <spnan>Didn't recieve a Code?</spnan>
                              <button id="rsnd" onClick={handleResendOTP}>
                                &nbsp;Resend
                              </button>
                            </p>
                            <button
                              type="submit"
                              className="btn btn-success"
                              id="otp-btn"
                              onClick={handleConfirmOTP}
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
}

export default App;
