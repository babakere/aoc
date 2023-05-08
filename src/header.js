import React from "react";
<<<<<<< HEAD
import { TopNav, Button } from "govuk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "govuk-react";
import LogoutButton from "./LogoutButton";

=======
import { TopNav } from "govuk-react";
import { Link } from "govuk-react";
import { useLocation } from "react-router-dom";
>>>>>>> abf1a392b3c7efdc58051a2d373dbb9f7de95d9b
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  const renderHomeLink = () => (
    <TopNav.NavLink href="main">Home</TopNav.NavLink>
  );

  return (
    <TopNav


      company={
        <TopNav.NavLink href="/main" target="new">
          AOC
        </TopNav.NavLink>
      }
    >
      {location.pathname === "/main" && (
        <div style={{ width: "200%" }}>
          <Button onClick={() => handleButtonClick("/login")}>Login</Button>
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
      {(location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/patientRecord") &&
        renderHomeLink()}
      {location.pathname === "/patient" && (
        <>
<<<<<<< HEAD
          <Button onClick={() => handleButtonClick("/PatientRecord")}>
            Patient Record
          </Button>
          <LogoutButton />
=======
          <TopNav.NavLink href="about">About</TopNav.NavLink>
          <TopNav.NavLink href="location">Location</TopNav.NavLink>
          <TopNav.NavLink href="loginselection">Login</TopNav.NavLink>
          <TopNav.NavLink href="register">Register</TopNav.NavLink>
>>>>>>> abf1a392b3c7efdc58051a2d373dbb9f7de95d9b
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
