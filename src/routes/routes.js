import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { isAuthenticated } from "functions/utils";
import AlertBox from "components/AlertBox/AlertBox";
import "styles/global.css";

import "bootstrap/dist/css/bootstrap.min.css";

import NotFound from "pages/NotFound/NotFound";

import Login from "pages/Customer/Login/Login";
import Register from "pages/Customer/Register/Register";

import Home from "pages/Home/Home";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <main>
              <AlertBox />

              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route exact path="/" component={Home} />

                <Route component={NotFound} />
              </Switch>
            </main>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default Routes;
