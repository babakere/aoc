import React from "react";

const Header = () => {
  return (
    <TopNav
      children={
        <div>
          <Link href="about" class="blue">
            about
          </Link>
          <Link href="location">location</Link>
        </div>
      }
    ></TopNav>
  );
};

export default Header;
