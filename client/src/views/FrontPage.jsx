import React, {useState, useEffect} from 'react'
import { Routes, Route, Link, Outlet } from "react-router-dom";
import '../App.css'

function FrontPage() {

  const token = localStorage.getItem("token");


return (
<>
<div className="Homepage">
{!token && (
      <div className='register_form'>
      <h3> Sign Up for access.</h3>  
      <ul> 
          <li><button >Register</button></li>
          <li><button >Login</button></li>
          </ul>
      </div>
    )}
       <Link className='home_link' to="/" onClick={(e) => {
        if (!localStorage.getItem("token")) {
          e.preventDefault();
              // Customized alert
              const alertDiv = document.createElement('div');
              alertDiv.classList.add('custom-alert');
              alertDiv.innerHTML = `
                <p>Welcome back! Please login to access the homepage.</p>
              `;
              document.body.appendChild(alertDiv);
              // Remove the alert after 3 seconds
              setTimeout(() => {
                document.body.removeChild(alertDiv);
              }, 3000);
            }
          }}>Go to SNAPIFY</Link>
      </div>
      <Outlet />      
    </>
  );
}
export default FrontPage