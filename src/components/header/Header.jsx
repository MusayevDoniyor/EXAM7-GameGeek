import React from "react";
import UpperHeader from "./UpperHeader";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <header className="sticky ">
        <UpperHeader />
        <LowerHeader />
      </header>
    </>
  );
};

export default Header;
