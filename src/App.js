import React from "react";
import { ThemeProvider } from "malcomponents";

import GlobalStyle from "./GlobalStyle";
import Signup from "./features/auth/Signup";

function App() {
  return (
    <ThemeProvider>
      <Signup />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
