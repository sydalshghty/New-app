import imgLogo from "../images/Logo (2).svg";
import "../css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
  
    if (!refreshToken) {
      console.error("No refresh token found, please login again.");
      return null;
    }
  
    try {
      const response = await fetch("https://united-hanger-2025.up.railway.app/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      if (!response.ok) {
        console.error("Failed to refresh token. Please login again.");
        return null;
      }
  
      const data = await response.json();
      localStorage.setItem("accessToken", data.access_token);
      return data.access_token;
  
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  

  const fetchWithAuth = async (url, options = {}) => {
    let accessToken = localStorage.getItem("accessToken");
  
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = `Bearer ${accessToken}`;
  
    let response = await fetch(url, options);
  
    if (response.status === 401) { // توكن منتهي الصلاحية
      console.warn("Access token expired, trying to refresh...");
  
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        console.error("Failed to refresh token, redirecting to login...");
        window.location.href = "/login"; // إعادة توجيه المستخدم لتسجيل الدخول
        return;
      }
  
      // جرب الطلب مرة أخرى بعد تحديث التوكن
      options.headers["Authorization"] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }
  
    return response;
  };

  

const [Username, setUsername] = useState("");
const [Password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("username", Username);
  formData.append("password", Password);

  try {
    const response = await fetch("https://united-hanger-2025.up.railway.app/api/login", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Login failed! ${errorData.message || "Please check your credentials."}`);
      return;
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);

    alert("Login successful!");
    navigate("/Slider");

  } catch (error) {
    console.error("Error during login:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};
  return (
    <div className="login-departament">
      <div className="login-content">
        <div className="logo-content">
          <img src={imgLogo} alt="img-logo" />
          <p>United Hanger</p>
        </div>
        <h3>Login to your account</h3>
        <form onSubmit={handleLogin}>
          <div className="col-Username">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="col-Password">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-Login">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
