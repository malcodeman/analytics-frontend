import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "./themes/lightTheme";
import queries from "./api/queries";
import constants from "./constants";
import GlobalStyle from "./GlobalStyle";
import history from "./routing/history";
import PrivateRoute from "./routing/PrivateRoute";
import Signup from "./features/auth/Signup";
import Onboarding from "./features/onboarding/Onboarding";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./features/layout/Layout";
import Sites from "./features/sites/Sites";
import Billing from "./features/billing/Billing";
import Account from "./features/account/Account";

function App() {
  const { data } = useQuery(queries.IS_LOGGED_IN);
  const isLoggedIn = data.isLoggedIn;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        {isLoggedIn ? (
          <Layout>
            <Route exact path="/" component={Dashboard} />
            <Route path="/sites" component={Sites} />
            <Route path="/billing" component={Billing} />
            <Route path="/account" component={Account} />
            <Route path="/onboarding" component={Onboarding} />
          </Layout>
        ) : (
          <Route exact path="/" component={Signup} />
        )}
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
