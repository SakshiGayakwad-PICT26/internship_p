import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./HomePage.css";
import image from "../assets/attendance-image.png"; // Import image

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="home-container">
      <div className="text-container">
        <h1>Sign In to <br /> Face Attendance <br /> Management System</h1>
        <br />
        <button className="sign-in-button" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>
      <div className="image-container">
        <img src={image} alt="Attendance System" className="home-image" />
      </div>
    </div>
  );
};

export default HomePage;
