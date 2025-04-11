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

// import React from "react";
// import "./AdminDashboard.css";
// import { FaCamera, FaDatabase, FaArrowLeft } from "react-icons/fa";

// const AdminDashboard = () => {
//   const triggerScript = async (script) => {
//     await fetch(`http://localhost:5000/${script}`, { method: "POST" });
//   };

//   return (
//     <div className="admin-container">
//       <h1 className="admin-title">Admin Dashboard</h1>
//       <div className="options">
//         <div className="option-card">
//           <FaCamera className="icon" />
//           <h2>Add Student</h2>
//           <p>Add new students to the database by capturing their images.</p>
//           <button className="action-button" onClick={() => triggerScript("run-capture")}>Go to Capture</button>
//         </div>
//         <div className="option-card">
//           <FaDatabase className="icon" />
//           <h2>Train Model</h2>
//           <p>Train the AI model with newly added student images.</p>
//           <br />
//           <button className="action-button" onClick={() => triggerScript("run-train")}>Train Model</button>
//         </div>
//       </div>

//       <button className="back-home-button">
//         <FaArrowLeft className="back-icon" />
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;


// logic for capture and add photos manually 
import React, { useRef } from "react";
import "./AdminDashboard.css";
import { FaCamera, FaDatabase, FaArrowLeft, FaImages } from "react-icons/fa";

const AdminDashboard = () => {
  const fileInputRef = useRef(null);

  const triggerCapture = async () => {
    const name = prompt("Enter student name to capture:");
    if (!name) {
      alert("Student name is required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/run-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      alert(data.status || "Capture started!");
    } catch (error) {
      console.error("Error starting capture:", error);
      alert("Failed to start capture.");
    }
  };

  const triggerTraining = async () => {
    try {
      const response = await fetch("http://localhost:5000/run-train", {
        method: "POST",
      });

      const data = await response.json();
      alert(data.status || "Training started!");
    } catch (error) {
      console.error("Error starting training:", error);
      alert("Failed to start training.");
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const studentName = prompt("Enter student name for these images:");
    if (!studentName) return;

    const formData = new FormData();
    formData.append("name", studentName);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await fetch("http://localhost:5000/upload-images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(data.status || "Images uploaded!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Image upload failed.");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="options">
        <div className="option-card">
          <FaCamera className="icon" />
          <h2>Add Student</h2>
          <p>Add new students to the database by capturing their images.</p>
          <button className="action-button" onClick={triggerCapture}>
            Go to Capture
          </button>
        </div>

        <div className="option-card">
          <FaDatabase className="icon" />
          <h2>Train Model</h2>
          <p>Train the AI model with newly added student images.</p>
          <br />
          <button className="action-button" onClick={triggerTraining}>
            Train Model
          </button>
        </div>

        <div className="option-card">
          <FaImages className="icon" />
          <h2>Add Images of Student</h2>
          <p>Upload existing images from your system for a student.</p>
          <button className="action-button" onClick={triggerFileUpload}>
            Upload Images
          </button>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
