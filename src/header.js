import React from "react";
import {TopNav} from "govuk-react"
import {Link} from "govuk-react"
const Header = () => {
  return (
    <TopNav
      children={
        <div>
          <Link href="about" >about</Link>
          
          <Link href="location">location</Link>
          
          <Link href="Patient">patient</Link>

        </div>
      }
    ></TopNav>
  );
};

export default Header;
