import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase"; // Import Firestore & Auth

import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [semester, setSemester] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    subjects: [],
  });
  const [errors, setErrors] = useState({});

  const semesterSubjects = {
    "FE-I": ["Mathematics-I", "Physics-I", "Chemistry-I", "Programming-I"],
    "FE-II": ["Mathematics-II", "Physics-II", "Chemistry-II", "Programming-II"],
    "SE-I": ["Data Structures", "OOP", "DBMS", "Discrete Mathematics"],
    "SE-II": ["Algorithms", "OS", "Computer Networks", "Web Development"],
    "TE-I": ["Machine Learning", "Software Engineering", "AI", "Cloud Computing"],
    "TE-II": ["Big Data", "Cybersecurity", "IoT", "Blockchain"],
    "BE-I": ["Deep Learning", "DevOps", "Mobile Computing", "Ethical Hacking"],
    "BE-II": ["Final Year Project", "Advanced AI", "Quantum Computing", "5G Networks"],
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (role === "teacher" && !semester) newErrors.semester = "Please select a semester";
    if (role === "teacher" && formData.subjects.length === 0) newErrors.subjects = "Please select at least one subject";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (subject) => {
    setFormData((prevState) => ({
      ...prevState,
      subjects: prevState.subjects.includes(subject)
        ? prevState.subjects.filter((sub) => sub !== subject)
        : [...prevState.subjects, subject],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Register user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: role,
        semester: role === "teacher" ? semester : null,
        subjects: role === "teacher" ? formData.subjects : [],
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Full Name</label>
          <input type="text" name="fullName" className="login-input" placeholder="Enter your full name" onChange={handleChange} />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}

          <label className="login-label">Email</label>
          <input type="email" name="email" className="login-input" placeholder="Enter your email" onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <label className="login-label">Phone Number</label>
          <input type="tel" name="phone" className="login-input" placeholder="Enter your phone number" onChange={handleChange} />
          {errors.phone && <p className="error-text">{errors.phone}</p>}

          <label className="login-label">Password</label>
          <input type="password" name="password" className="login-input" placeholder="Enter your password" onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <label className="login-label">Confirm Password</label>
          <input type="password" name="confirmPassword" className="login-input" placeholder="Confirm your password" onChange={handleChange} />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <label className="login-label">Role</label>
          <select className="login-input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>

          {role === "teacher" && (
            <>
              <label className="login-label">Semester</label>
              <select className="login-input" value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option value="">Select Semester</option>
                {Object.keys(semesterSubjects).map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
              {semesterSubjects[semester]?.map((subject) => (
                <div key={subject}>
                  <input type="checkbox" value={subject} onChange={() => handleSubjectChange(subject)} />
                  {subject}
                </div>
              ))}
            </>
          )}

          <button type="submit" className="login-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
