import React, {useState} from 'react'
import { Outlet, Link } from "react-router-dom";
import Register from '../components/Register';
import Login from '../components/Login';
import '../App.css'

function FrontPage({ photos, mockPhotos }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const token = localStorage.getItem("token");
  console.log("Token retrieved:", token);

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleSuccess = () => {
    setShowRegister(false);
    setShowLogin(false);
  };

return (
<>
<div className="Homepage">
       {showRegister && <Register onSuccess={handleSuccess} />}
        {showLogin && <Login onSuccess={handleSuccess} />}
        <Link className='home_link' to="/home" onClick={(e) => {
          if (!localStorage.getItem("token")) {
            e.preventDefault();
            const alertDiv = document.createElement('div');
            alertDiv.classList.add('custom-alert');
            alertDiv.innerHTML = `
              <p>Welcome back! Please login to access the homepage.</p>
            `;
            document.body.appendChild(alertDiv);
            setTimeout(() => {
              document.body.removeChild(alertDiv);
              console.log('token:', localStorage)
            }, 3000);
          }
        }}>Welcome to SNAPIFY</Link>
{!token && (
      <div className='register_form'>
      <h3> Sign Up for access.</h3>  
      <ul> 
          <li><button className='frontButton' onClick={handleShowRegister}>Register</button></li>
          <li><button className='frontButton' onClick={handleShowLogin}>Login</button></li>
          </ul>
      </div>
    )}
      </div>
      <Outlet />
    </>
);
}

export default FrontPage;