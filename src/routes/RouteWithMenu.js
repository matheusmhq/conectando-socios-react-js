import React from "react";
import { Route } from "react-router-dom";

import MenuDefault from "components/Menu/MenuDefault";
import FooterDefault from "components/Footer/FooterDefault";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <MenuDefault {...props} />
          <Component {...props} />
          <FooterDefault />
        </>
      )}
    />
  );
};

export default PrivateRoute;
