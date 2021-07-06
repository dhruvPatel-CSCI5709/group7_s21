import React from "react";
import { FaBars } from "react-icons/fa";

const Main = ({ handleToggleSidebar, children }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <div style={{ backgroundColor: "#2a95bf" }}>
        <div
          style={{ backgroundColor: "#2a95bf" }}
          className="btn-toggle"
          onClick={() => handleToggleSidebar(true)}
        >
          <FaBars />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Main;
