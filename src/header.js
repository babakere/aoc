import React from "react";
import { TopNav } from "govuk-react";
import { Link } from "govuk-react";
import { useLocation } from "react-router-dom";
import { SearchIcon } from "govuk-react";
const Header = () => {
  const location = useLocation();
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
      {location.pathname != "/patientRecord" && (
        <>
          <div style={{ width: "200%" }}>
            <TopNav.NavLink href="about" style={{ marginRight: "7%" }}>
              About
            </TopNav.NavLink>
            <TopNav.NavLink href="location" style={{ margin: "3%" }}>
              Location{" "}
            </TopNav.NavLink>
            <TopNav.NavLink href="loginselection" style={{ margin: "3%" }}>
              Login{" "}
            </TopNav.NavLink>
            <TopNav.NavLink href="register" style={{ margin: "3%" }}>
              Register{" "}
            </TopNav.NavLink>
            <TopNav.NavLink href="deregister" style={{ margin: "3%" }}>
              Deregister
            </TopNav.NavLink>
          </div>
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
