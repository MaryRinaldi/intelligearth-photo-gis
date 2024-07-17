import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import UserComponent from '../components/UserComponent';
import '../App.css'
import logo from "../assets/Logo.png";
import standin from "../assets/Social-Media-People-Doodles.jpg";



function ProfilePage() {
    const [user, setUser] = useState(null);
    const { privateData } = UserComponent();


    useEffect(() => {
        fetch('/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
        })
            .then(userData => {
            setUser(userData);
            })
            .catch(error => {
                setError(error.message); // Set error state if fetch fails
                console.error('Error fetching user data:', error);
            });
}, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="logocontainer"><img className="logoimage" src={logo} alt="Logo"/></div>
            <div className="userprofiletitle">User Profile</div>
            <div className="profilepic"><strong> Profile Picture</strong></div> 
            <div>    <img src={standin} alt="profilepicstandin" style={{ width: '100px', height: '100px', marginLeft: '81%' }} /></div>
            <div style={{ width: '20px', height: '20px',  }}></div>
            <div className="usernameemailtext">
                <strong>Username:</strong> {user.userName}
            </div>

            <div className="usernameemailtext">
                <strong>Email:</strong> {user.userEmail}
            </div>
        </div>

  );
}

export default ProfilePage;