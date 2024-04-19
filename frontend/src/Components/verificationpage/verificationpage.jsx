import React, { useState } from "react";
import bgImg from "../../Assets/LoginPage.jpg";
import { Link } from "react-router-dom";
import "../../pages/Login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";






const Verificationpage = (props) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");


  const resend = async () => {
    try {
      const auth = JSON.parse(sessionStorage.getItem('auth'));
      const email = auth.email;
      const response = await axios.post('http://localhost:8080/api/v1/auth/resend', { userId, email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error resending OTP');
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/verify', { userId, otp });
        if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
              navigate('/login');
          }, 1000);
        } else {
          // Handle login failure
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          console.log('catch')
          toast.error(error.response.data.message);
        }
      }
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
                  Enter your Otp
                </h3>
              </span>
              <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
                <input
                  type="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter otp"
                  required
                />
                
                <button className="btn btn-primary" id="btn-lg" type="submit" >
                  Vefiy and login
                </button>
              </form>
              <p className="otp-message">OTP not received. Click <button onClick={resend}>here</button> to resend.</p>

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
export default Verificationpage;