import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import AlertBox from "components/AlertBox/AlertBox";
import "styles/global.css";

import "bootstrap/dist/css/bootstrap.min.css";
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

import PrivateRoute from "./PrivateRoute";
import RouteWithMenu from "./RouteWithMenu";

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
