import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { exact, path, isAuthorized, component: Component } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isAuthorized ? <Component /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
