import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import DeleteProfile from "./deleteProfile/deleteProfile";
import HomePage from "./homePage/HomePage";
import IncorrectPassword from "./incorrectPassword/IncorrectPassword";
import Profile from "./profile/Profile";
import Dashboard from "./dashboard/Dashboard";
import Reports from "./reports/Reports";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

export default function PermanentDrawerLeft() {
  const history = useHistory();
  useEffect(() => {
    console.log("Page Details", history);
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Sidebar />
        <Route exact path="/" component={HomePage} />
        <Route path="/deleteProfile" component={DeleteProfile}></Route>
        <Route path="/Profile" component={Profile}></Route>
        <Route path="/homePage" component={HomePage}></Route>
        <Route path="/Dashboard" component={Dashboard}></Route>
        <Route path="/incorrectPassword" component={IncorrectPassword}></Route>
        <Route path="/Reports" component={Reports}></Route>
      </div>
    </BrowserRouter>
  );
}
