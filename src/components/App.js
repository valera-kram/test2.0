import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import SignIn from "./SignIn";
import Profile from "./Profile";

import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/profile" exact component={Profile} />
            <Redirect from="/" to="profile" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
