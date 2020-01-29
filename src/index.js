import React from "react";
import { render } from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import constants from "./constants";
import App from "./App";

const MOUNT_NODE = document.getElementById("root");
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
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
cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem("token")),
    theme: localStorage.getItem("theme") || constants.THEMES.LIGHT
  }
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  MOUNT_NODE
);
