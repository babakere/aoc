import React from "react";
import { Button } from "govuk-react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleView = async (e) => {
    e.preventDefault();
    try {
      const data = { pass: "evan" };
      const params = new URLSearchParams(data).toString();
  
      const response = await fetch(`http://localhost:8000/doctor.php?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the data.");
    }
  }


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
    <Button onClick={handleView}>Log Out</Button>
  );
}

export default LogoutButton;