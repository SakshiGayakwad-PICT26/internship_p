import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";  

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <img src="./src/logo.png" alt="App Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
