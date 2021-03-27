import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../auth";

function AuthRoute(props) {
  const [logged] = useAuth();

  if (!logged) {
    <Redirect to="/login" />;
  }

  return <Route {...props} />;
}

export default AuthRoute;
