// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./TeacherAttendance.css";

// const timetable = {
//   Monday: [
//     { name: "FY1 OOPC Lecture", time: "10:20 AM - 11:15 AM", status: "Pending" },
//     { name: "FY2 OOPC Lecture", time: "12:00 PM - 03:00 PM", status: "Pending" },
//     { name: "A2 OOPC Lab", time: "03:15 PM - 05:15 PM", status: "Pending" },
//   ],
//   Tuesday: [
//     { name: "B1 OOPC Lab", time: "10:20 AM - 12:10 PM", status: "Pending" },
//     { name: "B2 OOPC Lab", time: "01:00 PM - 03:00 PM", status: "Pending" },
//   ],
//   Wednesday: [
//     { name: "C1 OOPC Lab", time: "01:00 PM - 03:00 PM", status: "Pending" },
//     { name: "C2 OOPC Lab", time: "03:15 PM - 05:15 PM", status: "Pending" },
//   ],
//   Thursday: [
//     { name: "FY1 OOPC Lecture", time: "09:00 AM - 10:00 AM", status: "Pending" },
//     { name: "FY2 OOPC Lecture", time: "11:15 AM - 12:10 PM", status: "Pending" },
//   ],
//   Friday: [
//     { name: "C9 OOPC Lab", time: "08:00 AM - 10:00 AM", status: "Pending" },
//   ],
// };

// const TeacherAttendance = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const navigate = useNavigate();

//   const getDayName = (date) => {
//     return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
//   };

//   const subjects = timetable[getDayName(selectedDate)] || [];

//   const handleMarkAttendance = (subjectName) => {
//     // Store selected subject in localStorage
//     localStorage.setItem("selectedSubject", subjectName);
//     // Navigate to Start.jsx
//     navigate("/start");
//   };

//   return (
//     <div className="attendance-container">
//       <h1 className="attendance-title">Teacher Attendance</h1>
//       <div className="date-picker-container">
//         <label>Select Date:</label>
//         <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
//       </div>
//       <div className="attendance-table">
//         <div className="table-header">
//           <span className="table-column">Subject</span>
//           <span className="table-column">Time</span>
//           <span className="table-column">Status</span>
//           <span className="table-column">Action</span>
//         </div>
//         {subjects.length > 0 ? (
//           subjects.map((subject, index) => (
//             <div key={index} className="table-row">
//               <span className="table-data">{subject.name}</span>
//               <span className="table-data">{subject.time}</span>
//               <span className={`table-data ${subject.status === "Pending" ? "pending" : "completed"}`}>{subject.status}</span>
//               <button className="mark-button" onClick={() => handleMarkAttendance(subject.name)}>Mark</button>
//               <button className="view-button"onClick={() => handleMarkAttendance(subject.name)}>View</button>
//             </div>
//           ))
//         ) : (
//           <div className="no-subjects">No subjects scheduled for this date.</div>
//         )}
//       </div>
//       <button className="back-home-button" onClick={() => navigate("/")}>⬅ Back to Home</button>
//     </div>
//   );
// };

// export default TeacherAttendance;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TeacherAttendance.css";

const timetable = {
  Monday: [
    { name: "FY1 OOPC Lecture", time: "10:20 AM - 11:15 AM", status: "Pending" },
    { name: "FY2 OOPC Lecture", time: "12:00 PM - 03:00 PM", status: "Pending" },
    { name: "A2 OOPC Lab", time: "03:15 PM - 05:15 PM", status: "Pending" },
  ],
  Tuesday: [
    { name: "B1 OOPC Lab", time: "10:20 AM - 12:10 PM", status: "Pending" },
    { name: "B2 OOPC Lab", time: "01:00 PM - 03:00 PM", status: "Pending" },
  ],
  Wednesday: [
    { name: "C1 OOPC Lab", time: "01:00 PM - 03:00 PM", status: "Pending" },
    { name: "C2 OOPC Lab", time: "03:15 PM - 05:15 PM", status: "Pending" },
  ],
  Thursday: [
    { name: "FY1 OOPC Lecture", time: "09:00 AM - 10:00 AM", status: "Pending" },
    { name: "FY2 OOPC Lecture", time: "11:15 AM - 12:10 PM", status: "Pending" },
  ],
  Friday: [
    { name: "C9 OOPC Lab", time: "08:00 AM - 10:00 AM", status: "Pending" },
  ],
};

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const getDayName = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const subjects = timetable[getDayName(selectedDate)] || [];

  const handleMarkAttendance = (subjectName) => {
    localStorage.setItem("selectedSubject", subjectName);
    navigate("/start");
  };

  const handleViewAttendance = (subjectName) => {
    navigate(`/view-attendance/${encodeURIComponent(subjectName)}`);
  };

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Teacher Attendance</h1>
      <div className="date-picker-container">
        <label>Select Date:</label>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </div>
      <div className="attendance-table">
        <div className="table-header">
          <span className="table-column">Subject</span>
          <span className="table-column">Time</span>
          <span className="table-column">Status</span>
          <span className="table-column">Action</span>
        </div>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div key={index} className="table-row">
              <span className="table-data">{subject.name}</span>
              <span className="table-data">{subject.time}</span>
              <span className={`table-data ${subject.status === "Pending" ? "pending" : "completed"}`}>{subject.status}</span>
              <button className="mark-button" onClick={() => handleMarkAttendance(subject.name)}>Mark</button>
              <button className="view-button" onClick={() => handleViewAttendance(subject.name)}>View</button>
            </div>
          ))
        ) : (
          <div className="no-subjects">No subjects scheduled for this date.</div>
        )}
      </div>
      <button className="back-home-button" onClick={() => navigate("/")}>⬅ Back to Home</button>
    </div>
  );
};

export default TeacherAttendance;
