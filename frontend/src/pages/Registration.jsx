import React from "react";
import { useForm } from "react-hook-form";
import bgImg from "./../Assets/img1.jpg";
import "./Registration.css";

const Registration = (props) => {
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
      <div className="container px-lg-5 ">
        <div className="row" id="rg-rw">
          <div className="col-sm-12 col-md-6 bg-white">
            <div className="text-center p-3">
              <h1 className="h3" id="ap-nm">
                FIT BUDDY
              </h1>
              <span>
                <h3 className="h4" id="reg-hd">
                  Get started with easily register
                </h3>
                <p id="reg-slogan">Free register any you can enjoy it</p>
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
                  placeholder="Full name"
                  required
                />
                <input
                  type="text"
                  {...register("User name")}
                  placeholder="User name"
                  required
                />
                <input
                  type="text"
                  {...register("password")}
                  placeholder="password"
                  required
                />
                <input
                  type="text"
                  {...register("confirmpwd")}
                  placeholder="confirm password"
                  required
                />
                <button className="btn btn-primary rounded-0 py-1">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-6 p-0">
            <img
              src={bgImg}
              alt={`Registration Page`}
              className="img-fluid"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
