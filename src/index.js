import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./state/store";

const MOUNT_NODE = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
);
