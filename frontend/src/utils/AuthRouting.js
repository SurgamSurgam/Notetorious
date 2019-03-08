import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export const MainPagePrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Redirect
          to={{
            pathname: "/notes",
            state: { from: props.location }
          }}
        />
      ) : (
      <Component {...props} {...rest} />
      )
    }
  />
);

// export default PrivateRoute;
