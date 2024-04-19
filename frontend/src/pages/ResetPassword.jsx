import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaZhihu } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import OtpVrfo_icon from "./../Assets/otpvrfo.png";
import "./ResetPassword.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const ResetPassword = (props) => {
  const navigate = useNavigate();
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ===================== For Password Validation =====================
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
  };
  const { userId } = useParams();


  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.put("http://localhost:8080/api/v1/auth/reset-password", {
        userId: userId,
        otp: otp,
        newPassword: password
      });
  
      const data = response.data;
  
      if (data.success) {
        // Password reset successful
        toast.success(data.message);
        
        // Clear localStorage
        localStorage.clear();
        
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        // Password reset failed
        toast.error(data.message);
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error resetting password. Please try again later.");
      }
    }
  };
  

  return (
    <>
      <div className="container-fluid">
        <ToastContainer/>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: window.innerHeight }}
        >
          <div className="card border-0">
            <div className="card-body p-0 shadow">
              <div className="row">
                <div className="col-md-6 col-sm-12 p-5">
                  <form onSubmit={resetPassword}>
                    <h1>Set a Password</h1>
                    <p>
                      Your previous password has been reset. Please set a new
                      password for your account.
                    </p>
                    <div className="input-container">
                      <label>Enter your OTP</label>
                      <div class="input-group mb-3">
                        <input
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-container">
                      <label>Create Password</label>
                      <div class="input-group mb-3">
                        <input
                          type={showPassword ? "text" : "password"}
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={password}
                          onChange={handlePasswordChange}
                          pattern="[A-Z,a-z,0-9,@,#]*"
                          required
                        />
                        <span
                          class="input-group-text"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div className="input-container">
                      <label>Re-enter Password</label>
                      <div class="input-group mb-3">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          pattern="[A-Z,a-z,0-9,@,#]*"
                          required
                        />
                        <span
                          class="input-group-text"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {!passwordsMatch && (
                        <p style={{ color: "red" }}>Passwords do not match</p>
                      )}
                      {!passwordLengthValid && (
                        <p style={{ color: "red" }}>
                          Password cannot be more than 8 characters long
                        </p>
                      )}
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 w-100"
                      >
                        Set Password
                      </button>
                    </div>
                  </form>
                </div>

                <div className="d-sm-none d-md-block col-md-6 border-start">
                  <div className="p-5">
                    <img
                      src={OtpVrfo_icon}
                      alt={`Asf`}
                      className="rounded-0"
                      style={{
                        maxHeight: window.innerHeight / 2,
                        width: "100%",
                      }}
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

export default ResetPassword;
