import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login_image from "./../Assets/login page.jpg";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //

    if (!formData.email.trim() || !formData.password.trim()) {
      if (!formData.email.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }

      if (!formData.password.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }
    setErrors({});
    alert("Login Successfully");
    // api call here
  };
  return (
    <div>
      <section className="bg-gray-300 min-h-screen flex items-center justify-center">
        {/* Login container */}
        <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-16">
            <h1 className="font-Sans text-3xl text-[#002D74]">Fit Buddy</h1>
            <p className="mt-3 font-bold text-xl">Login to your account!</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mt-5">
                <label>
                  <span className="mt-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 mt-1 px-3 py-2 rounded-xl bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Youraddres@email.com"
                  />
                </label>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <label>
                  <span className="mt-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="p-2 mt-1 px-3 py-2 rounded-xl bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Enter your password"
                  />
                </label>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
                <div className="flex justify-between items-end mt-5 text-xs text-[#002D74]">
                  <div></div>
                  <div>
                    <a href="#">Forgot your password?</a>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#FF9A00] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Login to Continue
              </button>
              <div className="mt-1 text-xs flex justify-between items-center text-[#002D74]">
                <p>
                  Don't have an account?<a href="#">Sign up</a>
                </p>
              </div>
            </form>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={Login_image} alt="Gym Image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
