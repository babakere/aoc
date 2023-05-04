import React from "react";
import { Button } from "govuk-react";
import { useNavigate } from "react-router-dom";
import $ from "jquery"
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8000/server.php",
    //     data: { pass: "ferferf" },
    //     success(data) {
    //       console.log(data);
    //     },
    //   });
    
    // Clear user-related data, such as authentication tokens, from local storage or cookies
    localStorage.clear();

    // Navigate to the login page
    navigate("/loginSelection");
  };

  return (
    <Button onClick={handleLogout}>Log Out</Button>
  );
}

export default LogoutButton;