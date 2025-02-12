import imgLogo from "../images/Logo (2).svg";
import "../css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", Username);
    formData.append("password", Password);

    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);

        alert("Login successful!");
        navigate("/Products"); 
      } else {
        const errorData = await response.json();
        alert(`Login failed! ${errorData.message || "Please check your credentials."}`);
      }
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
