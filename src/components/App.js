import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";

const App = () => {
  
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <Route path="/app" component={Layout} />
        {/* <PublicRoute path="/login" component={Login} /> */}
        <Route component={Error} />
      </Switch>
    </HashRouter>
  )
}

export default App