import React, { useEffect, useState } from "react";
import "./Userdashboard.css";

import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Userdashboard = () => {
  // My User
  const [user, setUser] = useState({});
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <div className="centeredDiv ">
        <h1 className="">Welcome {user?.name || "User"} !</h1>
        <p className="">Welcome to Fit Buddy</p>
        <Link
          className="dropdown-item d-flex align-items-center"
          to="/"
          onClick={() => {
            localStorage.removeItem("user");
          }}
        >
          <BiLogOut />
          &nbsp;
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Userdashboard;
