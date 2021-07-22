/**
 * Author: Kirtan Revinbhai Dudhatra
 * Banner Id: B00863410
 */
import React, { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";
import DeleteProfile from "./components/deleteProfile/deleteProfile";
import HomePage from "./pages/homePage/HomePage";
import IncorrectPassword from "./components/incorrectPassword/IncorrectPassword";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Reports from "./pages/reports/Reports";
import Expense from "./pages/expense/Expense";
import Income from "./pages/income/Income";
import Login from "./components/login/LoginPage";
import Logout from "./components/logout/LogoutPage";
import Register from "./components/register/RegisterPage";
import NotificationHome from "./pages/notificationHome/notificationHome";
import SetUpEMIDueDate from "./pages/notification/emi_setup";
import OptExpense from "./pages/optExpense/opt_expense";
import EmiView from "./pages/emiView/emi_view";
import EmiCalculator from "./pages/emicalculator/EmiCalculator";
import Aside from "./components/sidebar/newSidebar";
import ForgotPassword from "./components/login/ForgotPassword";
import ForgotPasswordOtp from "./components/login/ForgotPasswordOtp";
import Main from "./Main";

const Layout = ({ loginStatus }) => {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  console.log("login status", loginStatus);

  return (
    <Fragment>
      {loginStatus && (
        <Aside
          image={image}
          collapsed={collapsed}
          rtl={rtl}
          loginStatus={loginStatus}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      )}
      <Main handleToggleSidebar={handleToggleSidebar}>
        {loginStatus ? (
          <Switch>
            <Route exact path="/reports" component={Reports}></Route>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/deleteProfile"
              component={DeleteProfile}
            ></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/Dashboard" component={Dashboard}></Route>
            <Route
              exact
              path="/incorrectPassword"
              component={IncorrectPassword}
            ></Route>
            <Route exact path="/income" component={Income}></Route>
            <Route exact path="/expense" component={Expense}></Route>
            <Route exact path="/income" component={Income}></Route>
            <Route
              exact
              path="/emicalculator"
              component={EmiCalculator}
            ></Route>
            <Route exact path="/notifications" component={NotificationHome} />
            <Route exact path="/emisetup" component={SetUpEMIDueDate} />
            <Route exact path="/emiview" component={EmiView} />
            <Route exact path="/optreports" component={OptExpense} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route
              exact
              path="/forgotpassword/otp"
              component={ForgotPasswordOtp}
            />
            <Route
              exact
              path="/forgotpassword/passwordReset"
              component={ForgotPassword}
            />
            <Route path="/" component={Login}></Route>
          </Switch>
        )}
      </Main>
    </Fragment>
  );
};

export default Layout;
