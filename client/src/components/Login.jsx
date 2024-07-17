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
        // Simulated response from server
        const data = await response.json();
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect user to home
        onSuccess();
        navigate("/home");
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
      <p>
        Don't have an account? <button>Register</button>
      </p>
      <div>
        {error && <div className="text-danger">{error}</div>}
        {forgotPasswordClicked ? (
          <>
            <p>
              Forgot your password? Check your email for instructions.
            </p>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
            />
            <button
              className="home-button"
              onClick={handleSetNewPassword}
            >
              Set New Password
            </button>
          </>
        ) : (
          <button
            className="home-button"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;