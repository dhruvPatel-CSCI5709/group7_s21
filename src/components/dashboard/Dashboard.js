import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main">HI</div>
    </div>
  );
}
