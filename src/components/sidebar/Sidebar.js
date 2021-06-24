import React from "react";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import AccountBoxTwoToneIcon from "@material-ui/icons/AccountBoxTwoTone";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FunctionsTwoToneIcon from "@material-ui/icons/FunctionsTwoTone";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import logout from "../../reusables/Logout";

const lists = [
  {
    id: 1,
    title: "Dashboard",
    route: "dashboard",
    icon: <DashboardTwoToneIcon />,
  },
  {
    id: 2,
    title: "Finances",
    route: "finances",
    icon: <MonetizationOnTwoToneIcon />,
  },
  {
    id: 3,
    title: "Notifications",
    route: "notifications",
    icon: <NotificationsNoneTwoToneIcon />,
  },
  {
    id: 4,
    title: "Profile",
    route: "profile",
    icon: <AccountBoxTwoToneIcon />,
  },
  {
    id: 5,
    title: "Reports",
    route: "reports",
    icon: <AssessmentIcon />,
  },
  {
    id: 6,
    title: "Expense",
    route: "expense",
    icon: <AssessmentIcon />,
  },
  {
    id: 7,
    title: "EmiCalculator",
    route: "emicalculator",
    icon: <FunctionsTwoToneIcon />,
  },
  {
    id: 8,
    title: "Logout",
    route: null,
    icon: <ExitToAppIcon />,
  },
];

export default function Sidebar() {
  const [selected, setSelected] = useState();
  const [color, setColor] = useState("#808080");
  const [bgColor, setBgColor] = useState("");
  const [toggle, setToggle] = useState(true);
  const history = useHistory();

  const changeColor = () => {
    if (toggle) {
      setColor("white");
      setBgColor("#2a95bf");
      setToggle(false);
    } else {
      setColor("#808080");
      setBgColor("");
      setToggle(true);
    }
  };

  const handleColor = (row) => {
    setSelected(row.id);
  };

  const handleRoute = (route) => {
    let path = "/" + route;
    history.push(path);
  };

  const path = history.location.pathname.substr(1);
  console.log(path);
  return (
    <div className="root-sidebar">
      {lists.map((list) => (
        <button
          key={list.id}
          className="button-dashboard"
          style={{
            backgroundColor: list.title.toLowerCase() === path.toLowerCase() ? "#2a95bf" : "",
            color: list.title.toLowerCase() === path.toLowerCase() ? "white" : "#808080",
          }}
          onClick={() => {
            handleColor(list);
            handleRoute(list.title);
          }}
        >
          {list.icon}
          {list.title}
        </button>
      ))}
    </div>
  );
}
