import React from "react";
import { ThemeProvider } from "malcomponents";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import constants from "./constants";
import GlobalStyle from "./GlobalStyle";
import Signup from "./features/auth/Signup";

function App() {
  const client = new ApolloClient({
    uri: constants.GRAPHQL_URI
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Signup />
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
