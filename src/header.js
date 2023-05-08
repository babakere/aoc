import React from "react";
import { TopNav, Button } from "govuk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "govuk-react";
import LogoutButton from "./LogoutButton";

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
