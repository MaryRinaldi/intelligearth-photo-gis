import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login({ onSuccess }) {
  const [credentials, setCredentials] = useState({
    userName: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const alertDiv = document.createElement("div");
  alertDiv.classList.add("custom-alert");
  alertDiv.innerHTML = `<p>Welcome back to SNAPIFY</p>`;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "50%";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "#dcdcdc";
  alertDiv.style.padding = "1%";
  alertDiv.style.fontSize = '1.5rem';
  alertDiv.style.fontWeight = '600';
  alertDiv.style.border = "1px solid #8c9d88";
  alertDiv.style.borderRadius = "8px";
  alertDiv.style.zIndex = "1000"; 


  const login = async () => {
    try {
      // Simulated API call to the server
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        document.body.appendChild(alertDiv); 
       onSuccess();
        setTimeout(() => {
          document.body.removeChild(alertDiv);
          navigate("/home"); // Navigate after alert is shown and removed
        }, 1500);
      } else {
        setError("Invalid username or password");
        // Send recovery password email
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordClicked(true);
    // Here you can implement the logic to handle the forgot password functionality
  };


  const handleSetNewPassword = async () => {
    // Implement this function to handle setting a new password
  };
  

  return (
    <div className="register_form">
      <h3 className="page-header">Hello, please log in!</h3>
      <input
        value={credentials.userName}
        onChange={handleChange}
        name="userName"
        type="text"
        placeholder="Your username"
      />
      <input
        value={credentials.userPassword}
        onChange={handleChange}
        name="userPassword"
        type="password"
        placeholder="Your password"
      />
      <button className="home-button" onClick={login}>
        Log in
      </button>
      
      <div>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
}

export default Login;