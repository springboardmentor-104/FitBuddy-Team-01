import React, { useEffect, useState } from "react";
import "./Userdashboard.css";

const Userdashboard = () => {
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
      </div>
    </div>
  );
};

export default Userdashboard;
