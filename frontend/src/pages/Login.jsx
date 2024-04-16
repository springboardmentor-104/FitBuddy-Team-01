import React from "react";
import { useForm } from "react-hook-form";
import bgImg from "./../Assets/LoginPage.jpg";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <section
      className="register d-flex align-items-center"
      style={{ height: window.innerHeight }}
      id="reg-sec"
    >
      <div
        className="container px-lg-4 card card-body"
        style={{ height: window.innerHeight - 100, maxWidth: 800 }}
      >
        <div className="row h-100">
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            <div className="text-center p-3">
              <h1 className="h3" id="lg-lg">
                Fit Buddy
              </h1>
              <span>
                <h3 className="h4" id="lg-h4">
                  Login to your account!
                </h3>
              </span>
              <form id="form" className="flex flex-col">
                <input
                  type="text"
                  {...register("Email Address")}
                  placeholder="Email Address"
                  required
                />
                <input
                  type="text"
                  {...register("Full name")}
                  placeholder="Password"
                  required
                />

                <Link to="/forgot-password" id="fg-ps">
                  Forgot your password?
                </Link>
                <button className="btn btn-warning rounded-0 py-1">
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
