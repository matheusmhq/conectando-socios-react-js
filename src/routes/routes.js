import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { isAuthenticated } from "functions/utils";
import AlertBox from "components/AlertBox/AlertBox";
import "styles/global.css";

import "bootstrap/dist/css/bootstrap.min.css";
import MenuDefault from "components/Menu/MenuDefault";
import FooterDefault from "components/Footer/FooterDefault";
import ScrollToTop from "components/Others/ScrollToTop";
import BtnBackToTop from "components/Others/BtnBackToTop";

import NotFound from "pages/NotFound/NotFound";

import Login from "pages/Customer/Login/Login";
import Register from "pages/Customer/Register/Register";

import Home from "pages/Home/Home";
import HowWork from "pages/HowWork/HowWork";
import PublishProject from "pages/PublishProject/PublishProject";
import MyProjects from "pages/MyProjects/MyProjects";
import Details from "pages/Details/Details";
import User from "pages/User/User/User";

const PrivateRoute = ({ component: Component, ...rest }) => (
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

const RouteWithMenu = ({ component: Component, ...rest }) => (
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

function Routes() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AlertBox />
            <ScrollToTop />
            <BtnBackToTop />
            <main className="main-all">
              <Switch>
                <RouteWithMenu exact path="/login" component={Login} />
                <RouteWithMenu exact path="/register" component={Register} />
                <RouteWithMenu exact path="/" component={Home} />
                <RouteWithMenu exact path="/how-work" component={HowWork} />
                <RouteWithMenu exact path="/details/:id" component={Details} />
                <PrivateRoute
                  exact
                  path="/publish-project"
                  component={PublishProject}
                />
                <PrivateRoute
                  exact
                  path="/my-projects/:tab"
                  component={MyProjects}
                />
                <PrivateRoute exact path="/user/:tab" component={User} />

                <RouteWithMenu component={NotFound} />
              </Switch>
            </main>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default Routes;
