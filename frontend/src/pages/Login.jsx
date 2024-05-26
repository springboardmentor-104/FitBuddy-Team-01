import "./Login.css";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "./../Assets/LoginPage.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";

const Login = (props) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // not verified
  const [isVerified, setisVerified] = useState(false);

  const [setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [LoginUserId, setLoginUserId] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Check email validity
    // setEmailValid(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    // Check password validity only if the password is not empty
    setPasswordValid(newPassword.length === 0 || newPassword.length >= 8);
  };

  console.log("LoginUserId", LoginUserId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      // All fields are filled, mark registration as completed
      let data = {
        emailOrUsername: email.trim(),
        password: password.trim(),
      };
      await axios.post("http://localhost:8080/api/v1/auth/login", data).then(
        (response) => {
          if (response.data.success) {
            setLoginUserId(response?.data?.user?._id);
            let localData = {
              token: response?.data?.token,
              ...response?.data?.user,
            };
            localStorage.setItem("user", JSON.stringify(localData));
            localStorage.setItem("userId", JSON.stringify(localData?.userId));
            localStorage.setItem("token", JSON.stringify(localData?.token));
            toast.success("Login Successful", {
              position: "top-center",
              autoClose: 1000,
            });
            let successMessage = response.data.message;
            // Delay navigation to Userdashboard for 200 milliseconds
            setTimeout(() => {
              navigate("/Userdashboard", { state: { successMessage } });
            }, 1000);
          } else {
            setLoginUserId("");
          }
          //

          // alert(response.data.message);
          setIsLogin(true);
        },
        (error) => {
          console.log(error);
          alert(error?.data?.error || "Incorrect data for Login");
          setLoginUserId("");
          setIsLogin(false);
        }
      );
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields.");
    }
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { emailOrUsername: email, password }
      );
      if (response.data.success) {
        if (response.data.verify) {
          toast.success(response.data.message);
          setAuth({
            ...auth,
            token: response.data.token,
          });
          console.log("auth");
          console.log(auth);
          let localData = {
            token: response?.data?.token,
            ...response?.data?.user,
          };
          localStorage.setItem("user", JSON.stringify(localData));
          setTimeout(() => {
            navigate("/Userdashboard");
          }, 500);
        } else {
          toast.error(response.data.message);
          const userId = response.data.user.userId;
          setRegisteredUserId(userId);
          setisVerified(true);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    // This is a basic email validation regex, you can use a more comprehensive one if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // resend otp
  const [resendStatus, setResendStatus] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [userId, setUserId] = useState(""); // Add state for user ID

  // Inside your handleResendOTP function
  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const data = {
        email: email,
        userId: userId,
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/resend",
        data
      );
      if (response.data && response.data.success) {
        setResendStatus("OTP has been resent successfully.");
      } else {
        setResendStatus("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setResendStatus(
        "An error occurred while resending OTP. Please try again later."
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  // otp verification
  const [otp, setOtp] = useState("");
  const [registeredUserId, setRegisteredUserId] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if OTP is correct
      let data = {
        userId: registeredUserId,
        otp: otp,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/verify",
        data
      );
      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message); // Display success message using toast
        setTimeout(() => {
          navigate("/Userdashboard");
        }, 1000);
        setOtpVerified(true); // Update state to indicate OTP verification success
      } else {
        toast.error(responseData.message); // Display error message using toast
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error("Something went wrong");
      }
      // Display generic error message using toast
    }
  };

  return (
    <>  
    <section
      className="register d-flex align-items-center justify-content-center"
      style={{ height: window.innerHeight }}
      id="reg-sec"
    >
      <ToastContainer />
      <div
        className="container px-lg-4 card card-body"
        style={{ maxWidth: 800, margin:15}}
      >
        <div className="row h-100">
          <div className="col-sm-12 col-md-6">
            <div className="text-center p-3" id="reg-bx">
              <h1 className="h3" id="lg-lg">
                Fit Buddy
              </h1>
              <span>
                {!isVerified ? (
                  <h3 className="h4" id="lg-h4">
                    Login to your account!
                  </h3>
                ) : (
                  <h3 className="h4" id="lg-h4">
                    OTP verification
                  </h3>
                )}
              </span>
              {!isVerified ? (
                <form
                  id="form"
                  className="flex flex-col"
                  onSubmit={handleLoginSubmit}
                >
                  <div class="input-group mb-3">
                    <input
                      // {...register("Email Address")}
                      required
                      type="text"
                      value={email}
                      className="form-control"
                      onChange={handleEmailChange}
                      placeholder="Email Address"
                    />
                  </div>
                  {!emailValid && (
                    <small style={{ color: "red" }} id="warn">
                      Invalid email format
                    </small>
                  )}

                  <div className="input-group">
                    <input
                      // {...register("Full name")}
                      required
                      minLength={8}
                      maxLength={15}
                      value={password}
                      placeholder="Password"
                      className="form-control"
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      onChange={handlePasswordChange}
                      type={showPassword ? "password" : "text"}
                    />
                    <span
                      class="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {!passwordValid &&
                    password.length > 0 && ( // Display warning only if password is not empty
                      <small style={{ color: "red" }} id="warn">
                        Password should be at least 8 characters long
                      </small>
                    )}

                  <Link to="/forgot-password" id="fg-ps">
                    Forgot your password?
                  </Link>
                  <button className="btn btn-primary" id="btn-lg" type="submit">
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
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <div>
                    <p id="msg-rg-otp">
                      An authentication code has been sent to your email.
                    </p>
                    {/* <label className="input-group mb-3">Enter OTP</label> */}
                    <div className="input-group mb-3" id="">
                      <input
                        required
                        value={otp}
                        minLength={6}
                        maxLength={8}
                        placeholder="Enter OTP"
                        className="form-control"
                        onChange={handleOtpChange}
                        pattern="[A-Z,a-z,0-9,@,#]*"
                        type={showPassword ? "password" : "text"}
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <p className="Reg-OTP">
                      <span>{resendMessage}</span>
                      <span>
                        Didn't recieve a Code?
                        <button
                          id="reg-rsnd-btn"
                          onClick={handleResendOTP}
                          disabled={isResending}
                        >
                          {isResending ? "Resending..." : "Resend"}
                        </button>
                      </span>
                    </p>
                    {resendStatus && <p>{resendStatus}</p>}
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="otp-btn-fr-rg"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                  <div className="text-left" id="lgin-bx">
                    <small>
                      Already have an account ?{" "}
                      <Link to="/Login" id="sgin-up-lnk">
                        Sign In
                      </Link>
                    </small>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* <div className="d-none d-md-block col-6 p-0"> */}
          <div className="d-none d-md-block col-6 pt-3">
            <img
              src={bgImg}
              alt={`Registration Page`}
              className="img-fluid rounded"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section></>
  );
};
export default Login;
