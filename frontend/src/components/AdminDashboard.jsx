// import React from "react";
// import "./AdminDashboard.css";
// import { FaCamera, FaDatabase, FaArrowLeft } from "react-icons/fa";

// const AdminDashboard = () => {
//   return (
//     <div className="admin-container">
//       <h1 className="admin-title">Admin Dashboard</h1>
//       <div className="options">
//         <div className="option-card">
//           <FaCamera className="icon" />
//           <h2>Add Student</h2>
//           <p>Add new students to the database by capturing their images.</p>
//           <button className="action-button">Go to Capture</button>
//         </div>
//         <div className="option-card">
//           <FaDatabase className="icon" />
//           <h2>Train Model</h2>
//           <p>Train the AI model with newly added student images.</p>
//           <br />
//           <button className="action-button">Train Model</button>
//         </div>
//       </div>

//       {/* Back to Home Button */}
//       <button className="back-home-button">
//         <FaArrowLeft className="back-icon" />
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from "react";
import "./AdminDashboard.css";
import { FaCamera, FaDatabase, FaArrowLeft } from "react-icons/fa";

const AdminDashboard = () => {
  const triggerScript = async (script) => {
    await fetch(`http://localhost:5000/${script}`, { method: "POST" });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="options">
        <div className="option-card">
          <FaCamera className="icon" />
          <h2>Add Student</h2>
          <p>Add new students to the database by capturing their images.</p>
          <button className="action-button" onClick={() => triggerScript("run-capture")}>Go to Capture</button>
        </div>
        <div className="option-card">
          <FaDatabase className="icon" />
          <h2>Train Model</h2>
          <p>Train the AI model with newly added student images.</p>
          <br />
          <button className="action-button" onClick={() => triggerScript("run-train")}>Train Model</button>
        </div>
      </div>

      <button className="back-home-button">
        <FaArrowLeft className="back-icon" />
        Back to Home
      </button>
    </div>
  );
};

export default AdminDashboard;
