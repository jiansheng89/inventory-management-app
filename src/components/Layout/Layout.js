import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Sales from "../../pages/sales";
import Product from "../../pages/product";
import Inventory from "../../pages/inventory";
import Outlet from "../../pages/outlet";
import Employee from "../../pages/employee";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/sales" component={Sales} />
              <Route path="/app/product" component={Product} />
              <Route path="/app/inventory" component={Inventory} />
              <Route path="/app/outlet" component={Outlet} />
              <Route path="/app/employee" component={Employee} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
