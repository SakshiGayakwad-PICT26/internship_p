import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin"); // Default role: Admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      localStorage.setItem("token", userCredential.user.accessToken);

      // Navigate based on role selection
      if (role === "admin") {
        navigate("/AdminDashboard");
      } else if (role === "teacher") {
        navigate("/TeacherAttendance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Login As</label>
          <select
            className="login-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="register-link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
