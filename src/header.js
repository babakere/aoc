// Import required dependencies and components
import React from "react";
import { TopNav, Button } from "govuk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "govuk-react";
import LogoutButton from "./LogoutButton";

// Define the Header component
const Header = () => {
  // Get the current location and navigate functions from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Handle button click events for navigation
  const handleButtonClick = (route) => {
    navigate(route);
  };

  // Render the Home link
  const renderHomeLink = () => (
    <TopNav.NavLink href="main">Home</TopNav.NavLink>
  );

  // If the current location is "/patientRecord", only render an empty top navigation bar
  if (location.pathname === "/patientRecord") {
    return <TopNav />;
  }

  // Render the top navigation bar with appropriate navigation links and buttons based on the current location
  return (
    <TopNav
      company={
        <TopNav.Anchor href="/main" target="new">
          <TopNav.IconTitle icon={<SearchIcon height="32" width="36" />}>
            GOV.UK
          </TopNav.IconTitle>
        </TopNav.Anchor>
      }
      serviceTitle={
        <TopNav.NavLink href="/main" target="new">
          AOC Surgery
        </TopNav.NavLink>
      }
    >
      {location.pathname === "/main" && (
        <div style={{ width: "200%" }}>
          <Button onClick={() => handleButtonClick("/loginselection")}>
            Login
          </Button>
          <Button
            onClick={() => handleButtonClick("/register")}
            buttonColour="#f3f2f1"
            buttonHoverColour="#ffdd00"
            buttonShadowColour="#f47738"
            buttonTextColour="#0b0c0c"
          >
            Register
          </Button>
        </div>
      )}
      {(location.pathname === "/login" || location.pathname === "/register") &&
        renderHomeLink()}
      {location.pathname === "/patient" && (
        <>
          <Button onClick={() => handleButtonClick("/PatientRecord")}>
            Patient Record
          </Button>
          <LogoutButton />
        </>
      )}
      {location.pathname === "/doctor" && (
        <>
          <LogoutButton />
        </>
      )}
    </TopNav>
  );
};

export default Header;
