import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { exact, path, isAuthorized, component: Component } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isAuthorized ? <Component /> : <Redirect to="/login" />)}
    />
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  isAuthorized: PropTypes.bool,
  component: PropTypes.element
};

export default PrivateRoute;
