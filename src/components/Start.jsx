import React, { useState, useEffect } from "react";
import "./Start.css";

const Start = () => {
  const [subject, setSubject] = useState("Loading...");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const selectedSubject = localStorage.getItem("selectedSubject") || "Unknown Subject";
    setSubject(selectedSubject);
  }, []);

  const handleStart = () => {
    const newEntry = {
      id: attendanceData.length + 1,
      name: `Student ${attendanceData.length + 1}`,
      time: new Date().toLocaleTimeString(),
    };

    setAttendanceData([...attendanceData, newEntry]);
  };

  return (
    <div className="container">
      <h1 className="title">Attendance for {subject}</h1>
      <div className="button-container">
        <button className="start-btn" onClick={handleStart}>Start</button>
        <button className="end-btn">End</button>
      </div>
      <div className="attendance-list">
        <h2>Attendance List</h2>
        <ul>
          {attendanceData.map((entry) => (
            <li key={entry.id}>{entry.name} - {entry.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Start;
