import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TeacherAttendance.css";

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const subjectsByDate = {
    "2025-03-25": [
      { name: "Mathematics", time: "10:00 AM - 11:00 AM", status: "Pending" },
      { name: "Science", time: "11:30 AM - 12:30 PM", status: "Pending" },
    ],
    "2025-03-26": [
      { name: "History", time: "2:00 PM - 3:00 PM", status: "Pending" },
      { name: "English", time: "3:30 PM - 4:30 PM", status: "Pending" },
    ],
  };

  const formattedDate = selectedDate.toISOString().split("T")[0];
  const subjects = subjectsByDate[formattedDate] || [];

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Teacher Attendance</h1>
      <div className="date-picker-container">
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
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
              <span
                className={`table-data ${
                  subject.status === "Pending" ? "pending" : "completed"
                }`}
              >
                {subject.status}
              </span>
              <button className="mark-button">Mark Attendance</button>
            </div>
          ))
        ) : (
          <div className="no-subjects">
            No subjects scheduled for this date.
          </div>
        )}
      </div>
      <button className="back-home-button" onClick={() => navigate("/")}>⬅ Back to Home</button>
    </div>
  );
};

export default TeacherAttendance;
