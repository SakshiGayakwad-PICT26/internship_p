import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplachScreen";
import HomePage from "./components/HomePage";
import AdminDashboard from "./components/AdminDashboard";
import TeacherAttendance from "./components/TeacherAttendance";
import Login from "./components/Login";  // Import Login component
import Register from "./components/Register";
import "./App.css"; // Import global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/teacherAttendance" element={<TeacherAttendance />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;