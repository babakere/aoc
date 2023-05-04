import React from "react";
import { TopNav } from "govuk-react";
import { Link } from "govuk-react";

const Header = () => {
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
    </TopNav>
  );
};

export default Header;
