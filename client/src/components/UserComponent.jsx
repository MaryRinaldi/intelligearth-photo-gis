import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserComponent () {
  const [privateData, setPrivateData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    //if no token then navigate to login
    let token = localStorage.getItem("token");
    if (!token) navigate("/");
    //send post request including authorization header
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let results = await fetch("/api/private", options);
      if (results.ok) {
        let data = await results.json();
        //store response private data
        setPrivateData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    //remove token from local storage
    localStorage.removeItem("token");
    //navigate to login page
    navigate("/");
  };

  return { privateData, logout };
};

export default UserComponent;
