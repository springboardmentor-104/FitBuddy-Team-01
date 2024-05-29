import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUp } from "react-icons/bs";
import "../../pages/MyProfile.css";
import "../../pages/Userdashboard.css";

const BackToTop = () => {
  return (
    <div>
      <Link
        to=""
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <BsArrowUp style={{ color: "#fff" }} />
      </Link>
    </div>
  );
};

export default BackToTop;
