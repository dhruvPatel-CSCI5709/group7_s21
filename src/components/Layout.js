import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import DeleteProfile from "./deleteProfile/deleteProfile";
import HomePage from "./homePage/HomePage";
import IncorrectPassword from "./incorrectPassword/IncorrectPassword";
import Profile from "./profile/Profile";
import Dashboard from "./dashboard/Dashboard";
import Reports from "./reports/Reports";
import Expense from "./expense/Expense";
import Login from "./login/LoginPage";
import SetUpEMIDueDate from "./notification/emi_setup";
import OptExpense from "./notification/opt_expense";
import EmiCalculator from "./emicalculator/EmiCalculator";
import Aside from "./sidebar/newSidebar";
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
