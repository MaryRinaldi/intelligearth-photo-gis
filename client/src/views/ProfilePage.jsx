import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import logo from "../assets/Logo.png";

function ProfilePage({ photos }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
                console.error('Error fetching user data:', error);
            navigate("/");    
            });
    }, [navigate]);

    
    const userLocations = photos.map(photo => ({
        latitude: photo.latitude,
        longitude: photo.longitude
    }));

    return (
        <div>
            <div className="logocontainer">
                <img className="logoimage" src={logo} alt="Logo"/>
            </div>
            <div className="userprofiletitle">User Profile</div>
            <div className="usernameemailtext">
                <strong>Username:</strong> {user?.userName}
                <strong>Email:</strong> {user?.userEmail}
            </div>
            <div className="usernameemailtext">
            <h3>Informazioni sui Luoghi Visitati</h3>
                {userLocations.length > 0 ? (
                    userLocations.map((location, index) => (
                    <div key={index}>
                        <div>Lat: {location.latitude},
                        Lng: {location.longitude}</div>
                    </div>
                ))
            ) : (
                <p>No locations found.</p>
            )}
            </div>
            <div className="usernameemailtext">
                
            </div>
        </div>
    );
}

export default ProfilePage;
