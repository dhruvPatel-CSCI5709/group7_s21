import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import DeleteProfile from "./deleteProfile/deleteProfile";
import HomePage from "./homePage/HomePage";
import IncorrectPassword from "./incorrectPassword/IncorrectPassword";
import Profile from "./profile/Profile";
import Dashboard from "./dashboard/Dashboard";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  cardRoot: {
    maxWidth: "flex",
  },
  innerCardRoot: {
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: `calc((100% - ${drawerWidth}px)/2)`,
  },
  media: {
    height: 140,
    width: `calc((100% - ${drawerWidth}px)/3)`,
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marging: "auto",
  },
  innerPaper: {
    variant: "elevation",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(40),
      height: theme.spacing(16),
    },
  },
  image: {
    width: 240,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

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
