import React from "react";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="header-container">
      <div>Fincare!</div>
      <div>{title}</div>
    </div>
  );
};

export default Header;
