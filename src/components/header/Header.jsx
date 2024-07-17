import React from "react";
import UpperHeader from "./UpperHeader";
import LowerHeader from "./LowerHeader";

const Header = ({ carts }) => {
  return (
    <header className="sticky top-0 z-50">
      <UpperHeader />
      <LowerHeader carts={carts} />
    </header>
  );
};

export default Header;
