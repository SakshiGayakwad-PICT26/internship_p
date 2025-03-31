// import React, { useState, useEffect } from "react";
// import "./Start.css";

// const Start = () => {
//   const [subject, setSubject] = useState("Loading...");
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     const selectedSubject = localStorage.getItem("selectedSubject") || "Unknown Subject";
//     setSubject(selectedSubject);
//   }, []);

//   const handleStart = () => {
//     const newEntry = {
//       id: attendanceData.length + 1,
//       name: `Student ${attendanceData.length + 1}`,
//       time: new Date().toLocaleTimeString(),
//     };

//     setAttendanceData([...attendanceData, newEntry]);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Attendance for {subject}</h1>
//       <div className="button-container">
//         <button className="start-btn" onClick={handleStart}>Start</button>
//         <button className="end-btn">End</button>
//       </div>
//       <div className="attendance-list">
//         <h2>Attendance List</h2>
//         <ul>
//           {attendanceData.map((entry) => (
//             <li key={entry.id}>{entry.name} - {entry.time}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Start;



// working but chatgpt ui
// import React, { useState, useEffect } from "react";
// import "./Start.css";

// const Start = () => {
//   const [subject, setSubject] = useState("Loading...");
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     const selectedSubject = localStorage.getItem("selectedSubject") || "Unknown Subject";
//     setSubject(selectedSubject);
//   }, []);

//   const fetchAttendance = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/get-attendance");
//       const data = await response.json();
//       setAttendanceData(data);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     }
//   };

//   const handleStart = async () => {
//     await fetch("http://localhost:5000/start-attendance", {
//       method: "POST",
//     });

//     const id = setInterval(fetchAttendance, 2000);
//     setIntervalId(id);
//   };

//   const handleEnd = async () => {
//     await fetch("http://localhost:5000/stop-attendance", {
//       method: "POST",
//     });

//     clearInterval(intervalId);
//     setIntervalId(null);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Attendance for {subject}</h1>
//       <div className="button-container">
//         <button className="start-btn" onClick={handleStart}>Start</button>
//         <button className="end-btn" onClick={handleEnd}>End</button>
//       </div>
//       <div className="attendance-list">
//         <h2>Attendance List</h2>
//         <ul>
//           {attendanceData.map((entry, index) => (
//             <li key={index}>{entry.name} - {entry.time}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Start;



// import React, { useState, useEffect } from "react";
// import "./Start.css";

// const Start = () => {
//   const [subject, setSubject] = useState("Loading...");
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     const selectedSubject = localStorage.getItem("selectedSubject") || "Unknown Subject";
//     setSubject(selectedSubject);
//   }, []);

//   const fetchAttendance = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/get-attendance");
//       const data = await response.json();
//       setAttendanceData(data);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     }
//   };

//   const handleStart = async () => {
//     try {
//       await fetch("http://127.0.0.1:5000/start-attendance", { method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ subject }) });

//         const data = await response.json();
//         console.log("Start Response:", data);

//       setIsRunning(true);
      
//     } catch (error) {
//       console.error("Error starting attendance:", error);
//     }
//   };

//   const handleEnd = async () => {
//     try {
//       await fetch("http://127.0.0.1:5000/stop-attendance", { method: "POST" });
//       setIsRunning(false);
//       fetchAttendance();
//     } catch (error) {
//       console.error("Error stopping attendance:", error);
//     }
//   };

//   useEffect(() => {
//     if (isRunning) {
//       const interval = setInterval(fetchAttendance, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [isRunning]);

//   return (
//     <div className="container">
//       <h1 className="title">Attendance for {subject}</h1>
//       <div className="button-container">
//         <button className="start-btn" onClick={handleStart} disabled={isRunning}>Start</button>
//         <button className="end-btn" onClick={handleEnd} disabled={!isRunning}>End</button>
//       </div>
//       <div className="attendance-list">
//         <h2>Attendance List</h2>
//         <ul>
//           {attendanceData.map((entry, index) => (
//             <li key={index}>{entry.name} - {entry.time}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Start;


// import React, { useState, useEffect } from "react";
// import "./Start.css";

// const Start = () => {
//   const [subject, setSubject] = useState("Loading...");
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     const selectedSubject = localStorage.getItem("selectedSubject") || "Unknown Subject";
//     setSubject(selectedSubject);
//   }, []);

//   const fetchAttendance = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/get-attendance");
//       const data = await response.json();
//       setAttendanceData(data);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     }
//   };

//   const handleStart = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ subject }),
//       });

//       const data = await response.json();
//       console.log("Start Response:", data);

//       setIsRunning(true);
//     } catch (error) {
//       console.error("Error starting attendance:", error);
//     }
//   };

//   const handleEnd = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/stop-attendance", {
//         method: "POST",
//       });

//       const data = await response.json();
//       console.log("End Response:", data);

//       setIsRunning(false);
//       fetchAttendance();
//     } catch (error) {
//       console.error("Error stopping attendance:", error);
//     }
//   };

//   useEffect(() => {
//     if (isRunning) {
//       const interval = setInterval(fetchAttendance, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [isRunning]);

//   return (
//     <div className="container">
//       <h1 className="title">Attendance for {subject}</h1>
//       <div className="button-container">
//         <button className="start-btn" onClick={handleStart} disabled={isRunning}>Start</button>
//         <button className="end-btn" onClick={handleEnd} disabled={!isRunning}>End</button>
//       </div>
//       <div className="attendance-list">
//         <h2>Attendance List</h2>
//         <ul>
//           {attendanceData.map((entry, index) => (
//             <li key={index}>{entry.name} - {entry.time}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Start;


import React, { useState, useEffect } from "react";
import "./Start.css";

const Start = () => {
  const [subject, setSubject] = useState("Loading...");
  const [attendanceData, setAttendanceData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const selectedSubject = localStorage.getItem("selectedSubject") || "Unknown Subject";
    setSubject(selectedSubject);
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-attendance");
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleStart = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/start-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });

      setIsRunning(true);
    } catch (error) {
      console.error("Error starting attendance:", error);
    }
  };

  const handleEnd = async () => {
    try {
      await fetch("http://127.0.0.1:5000/stop-attendance", { method: "POST" });

      setIsRunning(false);
      fetchAttendance();
      clearInterval(intervalId);
    setIntervalId(null);
    } catch (error) {
      console.error("Error stopping attendance:", error);
    }
  };

  return (
    <div className="container">
      <h1>Attendance for {subject}</h1>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleEnd} disabled={!isRunning}>End</button>
      <ul>{attendanceData.map((entry, i) => <li key={i}>{entry.name} - {entry.time}</li>)}</ul>
    </div>
  );
};

export default Start;

