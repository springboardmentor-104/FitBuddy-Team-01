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
    <section>
      <div className="register">
        <div className="col-1">
          <h1>Fit Buddy</h1>
          <span>
            <h3>Get started with easily register</h3>
            Free register any you can enjoy it
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

            <button className="btn">Sign In</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
};
export default Registration;
