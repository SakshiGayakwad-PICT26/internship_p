// import React, { useState, useEffect } from "react";
// import "./ViewAttendance.css";
// import * as XLSX from "xlsx";

// const ViewAttendance = () => {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         fetchAttendanceData();
//     }, []);

//     const fetchAttendanceData = async () => {
//         try {
//             const response = await fetch("/attendance.xlsx");
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const data = new Uint8Array(e.target.result);
//                 const workbook = XLSX.read(data, { type: "array" });
//                 const sheetName = workbook.SheetNames[0];
//                 const sheet = workbook.Sheets[sheetName];
//                 const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // Ensure no empty rows are skipped
//                 console.log("Extracted Data:", jsonData);
//                 setStudents(jsonData);
//             };
//             reader.readAsArrayBuffer(blob);
//         } catch (error) {
//             console.error("Error fetching attendance data:", error);
//         }
//     };

//     // Split students into two columns
//     const midIndex = Math.ceil(students.length / 2);
//     const firstColumn = students.slice(0, midIndex);
//     const secondColumn = students.slice(midIndex);

//     return (
//         <div className="attendance-container">
//             <h2 className="attendance-title">Attendance List</h2>
//             <div className="attendance-wrapper">
//                 {/* First Column */}
//                 <div className="attendance-column">
//                     <table className="attendance-table">
//                         <thead>
//                             <tr>
//                                 <th>Roll No</th>
//                                 <th>Student Name</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {firstColumn.map((student, index) => (
//                                 <tr key={index} className={student.Status === "PRESENT" ? "present" : "absent"}>
//                                     <td>{student["ROLL NO"]}</td>
//                                     <td>{student["STUDENT"]}</td>
//                                     <td>{student.Status || "N/A"}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Second Column */}
//                 <div className="attendance-column">
//                     <table className="attendance-table">
//                         <thead>
//                             <tr>
//                                 <th>Roll No</th>
//                                 <th>Student Name</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {secondColumn.map((student, index) => (
//                                 <tr key={index} className={student.Status === "PRESENT" ? "present" : "absent"}>
//                                     <td>{student["ROLL NO"]}</td>
//                                     <td>{student["STUDENT"]}</td>
//                                     <td>{student.Status || "N/A"}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewAttendance;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewAttendance.css";
import * as XLSX from "xlsx";

const ViewAttendance = () => {
    const { subject } = useParams(); // Get subject from URL
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const fileName = `attendance_${subject}.xlsx`; // Adjust filename format
            const response = await fetch(`/${fileName}`);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
                setStudents(jsonData);
            };
            reader.readAsArrayBuffer(blob);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    // Split students into two columns
    const midIndex = Math.ceil(students.length / 2);
    const firstColumn = students.slice(0, midIndex);
    const secondColumn = students.slice(midIndex);

    return (
        <div className="attendance-container">
            <h2 className="attendance-title">Attendance for {subject}</h2>
            <div className="attendance-wrapper">
                {/* First Column */}
                <div className="attendance-column">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstColumn.map((student, index) => (
                                <tr key={index} className={student.Status === "PRESENT" ? "present" : "absent"}>
                                    <td>{student["ROLL NO"]}</td>
                                    <td>{student["STUDENT"]}</td>
                                    <td>{student.Status || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Second Column */}
                <div className="attendance-column">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secondColumn.map((student, index) => (
                                <tr key={index} className={student.Status === "PRESENT" ? "present" : "absent"}>
                                    <td>{student["ROLL NO"]}</td>
                                    <td>{student["STUDENT"]}</td>
                                    <td>{student.Status || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewAttendance;
