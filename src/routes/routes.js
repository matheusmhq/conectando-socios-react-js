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

import NotFound from "pages/NotFound/NotFound";

import Login from "pages/Customer/Login/Login";
import Register from "pages/Customer/Register/Register";

import Home from "pages/Home/Home";
import HowWork from "pages/HowWork/HowWork";
import PublishProject from "pages/PublishProject/PublishProject";
import MyProjects from "pages/MyProjects/MyProjects/MyProjects";
import Details from "pages/Details/Details";

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
            <main>
              <AlertBox />
              <ScrollToTop />

              <Switch>
                <RouteWithMenu exact path="/login" component={Login} />
                <RouteWithMenu exact path="/register" component={Register} />
                <RouteWithMenu exact path="/" component={Home} />
                <RouteWithMenu exact path="/how_work" component={HowWork} />
                <RouteWithMenu exact path="/details/:id" component={Details} />
                <PrivateRoute
                  exact
                  path="/publish_project"
                  component={PublishProject}
                />
                <PrivateRoute
                  exact
                  path="/my_projects/:tab"
                  component={MyProjects}
                />

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
