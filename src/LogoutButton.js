import React from "react";
import { Button } from "govuk-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/main"); // Replace with your desired logout URL
  };

  return <Button onClick={handleLogoutClick}>Logout</Button>;
};

export default LogoutButton;
