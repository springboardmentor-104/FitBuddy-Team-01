import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import OtpVrfo_icon from "./../Assets/otpvrfo.png";
// import "./ResetPassword.css"; // Import the CSS file

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [height, setHeight] = useState(0);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    console.log(password, confirmPassword);
  };

  document.body.style.overflow = "hidden";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: window.innerHeight }}
        >
          <div className="card border-0">
            <div className="card-body p-0 shadow">
              <div className="row">
                <div className="col-md-6 col-sm-12 p-5">
                  <form onSubmit={handleSubmit}>
                    <h1>Set a Password</h1>
                    <p>
                      Your previous password has been reset. Please set a new
                      password for your account.
                    </p>
                    <div className="input-container">
                      <label>Create Password</label>
                      <div class="input-group mb-3">
                        <input
                          type={showPassword ? "text" : "password"}
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          onChange={handlePasswordChange}
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
                      <label>Create Password</label>
                      <div class="input-group mb-3">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          onChange={handleConfirmPasswordChange}
                        />
                        <span
                          class="input-group-text"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
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
