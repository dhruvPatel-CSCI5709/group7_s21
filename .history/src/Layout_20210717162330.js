import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import DeleteProfile from "./components/deleteProfile/deleteProfile";
import HomePage from "./pages/homePage/HomePage";
import IncorrectPassword from "./components/incorrectPassword/IncorrectPassword";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Reports from "./pages/reports/Reports";
import Expense from "./pages/expense/Expense";
import Income from "./pages/expense/Income";
import Login from "./components/login/LoginPage";
import SetUpEMIDueDate from "./pages/notification/emi_setup";
import OptExpense from "./pages/notification/opt_expense";
import EmiCalculator from "./pages/emicalculator/EmiCalculator";
import Aside from "./components/sidebar/newSidebar";
import Main from "./Main";

const Layout = () => {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <Fragment>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Main handleToggleSidebar={handleToggleSidebar}>
        <Route exact path="/reports" component={Reports}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/deleteProfile" component={DeleteProfile}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/Dashboard" component={Dashboard}></Route>
        <Route exact path="/income" component={Income}></Route>
        <Route
          exact
          path="/incorrectPassword"
          component={IncorrectPassword}
        ></Route>
        <Route exact path="/expense" component={Expense}></Route>
        <Route exact path="/emicalculator" component={EmiCalculator}></Route>
        <Route exact path="/notifications" component={SetUpEMIDueDate} />
        <Route exact path="/expenseopt" component={OptExpense} />
      </Main>
    </Fragment>
  );
};

export default Layout;
