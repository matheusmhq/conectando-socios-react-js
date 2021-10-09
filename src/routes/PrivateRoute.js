import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "functions/utils";
import MenuDefault from "components/Menu/MenuDefault";
import FooterDefault from "components/Footer/FooterDefault";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <>
            <MenuDefault {...props} />
            <Component {...props} />
            <FooterDefault />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
