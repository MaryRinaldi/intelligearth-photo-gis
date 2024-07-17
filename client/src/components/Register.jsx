import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register({ onSuccess }) {
  const [newUser, setNewUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const alertDiv = document.createElement("div");
  alertDiv.classList.add("custom-alert");
  alertDiv.innerHTML = `<p>Welcome to SNAPIFY</p>`;
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


  const register = async () => {
    try {
      // Send new user info to server
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      let results = await fetch("/api/register", options);
      if (results.ok) {
        onSuccess();
        document.body.appendChild(alertDiv);
        setTimeout(() => {
          document.body.removeChild(alertDiv);
          navigate("/home"); // Navigate after alert is shown and removed
        }, 1500);
      } else {
        let error = await results.json(); // Get the error message from the server
        if (error.code === "ER_DUP_ENTRY") {
          setError("The username is already taken");
        } else {
          setError(error.message);
        }
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <div className="register_form">
      <h3 className="page-header">Need to register?</h3>
      <input
        value={newUser.userName}
        onChange={handleChange}
        name="userName"
        type="text"
        placeholder="Your username"
      />
      <input
        value={newUser.userEmail}
        onChange={handleChange}
        name="userEmail"
        type="email"
        placeholder="Your email"
      />
      <input
        value={newUser.userPassword}
        onChange={handleChange}
        name="userPassword"
        type="password"
        placeholder="Your password"
      />
      <button className="home-button" onClick={register}>
        Register
      </button>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}
export default Register;