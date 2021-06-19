import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import DeleteProfile from "./deleteProfile/deleteProfile";
import HomePage from "./homePage/HomePage";
import IncorrectPassword from "./incorrectPassword/IncorrectPassword";
import Profile from "./profile/Profile";
import Dashboard from "./dashboard/Dashboard";
const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/deleteProfile" component={DeleteProfile}></Route>
        <Route path="/Profile" component={Profile}></Route>
        <Route path="/homePage" component={HomePage}></Route>
        <Route path="/Dashboard" component={Dashboard}></Route>
        <Route path="/incorrectPassword" component={IncorrectPassword}></Route>
      </div>
    </BrowserRouter>
  );
}
