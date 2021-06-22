import React from "react";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";

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
    icon: <AccountBoxRoundedIcon />,
  },
  {
    id: 5,
    title: "Statistical Reports",
    route: "reports",
    icon: <AssessmentIcon />,
  },
  {
    id: 6,
    title: "Expense",
    route: "expense",
    icon: <AssessmentIcon />,
  },
];

export default function Sidebar() {
  const history = useHistory();

  const handleRoute = (title, route) => {
    let path = "/" + route;
    history.push(path, { title: title });
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
            backgroundColor: list.title === path ? "#2a95bf" : "",
            color: list.title === path ? "white" : "#808080",
          }}
          onClick={() => {
            handleRoute(list.title, list.route);
          }}
        >
          {list.icon}
          {list.title}
        </button>
      ))}
    </div>
  );
}
