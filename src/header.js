import React from "react";
import { TopNav } from "govuk-react";
import { Link } from "govuk-react";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  return (
    <TopNav


      company={
        <TopNav.NavLink href="/main" target="new">
          AOC
        </TopNav.NavLink>
      }
    >

      <TopNav.NavLink href="about">About</TopNav.NavLink>
      <TopNav.NavLink href="location">Location</TopNav.NavLink>
      <TopNav.NavLink href="loginselection">Login</TopNav.NavLink>
      <TopNav.NavLink href="register">Register</TopNav.NavLink>
      <TopNav.NavLink href="deregister">Deregister</TopNav.NavLink>

      {location.pathname != "/patientRecord" && (
        <>
          <TopNav.NavLink href="about">About</TopNav.NavLink>
          <TopNav.NavLink href="location">Location</TopNav.NavLink>
          <TopNav.NavLink href="loginselection">Login</TopNav.NavLink>
          <TopNav.NavLink href="register">Register</TopNav.NavLink>
        </>
      )}
      {location.pathname == "/patientRecord" && (
        <>
          <TopNav.NavLink href="main">Home</TopNav.NavLink>
        </>
      )}

    </TopNav>
  );
};

export default Header;
