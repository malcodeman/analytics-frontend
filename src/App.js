import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import themes from "./themes";
import constants from "./constants";
import queries from "./api/queries";
import GlobalStyle from "./GlobalStyle";
import history from "./routing/history";
import Signup from "./features/auth/Signup";
import Signin from "./features/auth/Signin";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./features/layout/Layout";
import Sites from "./features/sites/Sites";
import Billing from "./features/billing/Billing";
import Account from "./features/account/Account";

function App() {
  const { data } = useQuery(queries.IS_LOGGED_IN);
  const findTheme = useQuery(queries.FIND_THEME);
  const isLoggedIn = data.isLoggedIn;
  const theme =
    findTheme.data && findTheme.data.theme === constants.THEMES.DARK
      ? themes.dark
      : themes.light;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        {isLoggedIn ? (
          <Layout>
            <>
              <Route exact path="/" component={Dashboard} />
              <Route path="/sites" component={Sites} />
              <Route path="/billing" component={Billing} />
              <Route path="/account" component={Account} />
            </>
          </Layout>
        ) : (
          <>
            <Route exact path="/" component={Signup} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </>
        )}
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
