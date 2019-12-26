import React from "react";
import { ThemeProvider } from "malcomponents";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import constants from "./constants";
import GlobalStyle from "./GlobalStyle";
import history from "./routing/history";
import PrivateRoute from "./routing/PrivateRoute";
import Signup from "./features/auth/Signup";
import Onboarding from "./features/onboarding/Onboarding";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./features/layout/Layout";
import Sites from "./features/sites/Sites";
import Account from "./features/account/Account";

function App() {
  const client = new ApolloClient({
    uri: constants.GRAPHQL_URI,
    request: operation => {
      const token = localStorage.getItem("token");

      if (token) {
        operation.setContext({
          headers: {
            authorization: token ? token : null
          }
        });
      }
    }
  });
  const isAuthorized = useSelector(state => state.auth.isAuthorized);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Router history={history}>
          {isAuthorized ? (
            <Layout>
              <Route exact path="/" component={Dashboard} />
              <Route path="/sites" component={Sites} />
              <Route path="/account" component={Account} />
              <Route path="/onboarding" component={Onboarding} />
            </Layout>
          ) : (
            <Route exact path="/" component={Signup} />
          )}
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
