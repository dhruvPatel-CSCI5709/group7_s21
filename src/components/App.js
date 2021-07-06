import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "react-pro-sidebar/dist/css/styles.css";
import Aside from "./sidebar/newSidebar";
import { IntlProvider } from "react-intl";
import messages from "./messages";
import Main from "./Main";
import "./App.scss";
import Layout from "./Layout";

export default function App() {
  const history = useHistory();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const loginStatus = localStorage.getItem("loginStatus");

    if (!loginStatus) {
      history.push("/login");
    }
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="App">
        <Layout />
      </div>
    </IntlProvider>
  );
}
