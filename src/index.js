import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { PrivateRoute } from "./utils/index";
import {
  NotFoundPageView,
  LeaderboardView,
  ProfileView,
  RegisterView,
  AboutView,
  AchievementsView,
  FutureEventsView,
  PastEventsView,
  LoginView,
  MyEventsView,
  TopicListView,
} from "./views/index";

const routing = (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path="/login" component={LoginView} />
        <Route path="/about" component={AboutView} />
        <Route exact path="/register" component={RegisterView} />

        <PrivateRoute path="/achievements" component={AchievementsView} />
        <PrivateRoute path="/myEvents" component={MyEventsView} />
        <PrivateRoute path="/futureEvents" component={FutureEventsView} />
        <PrivateRoute path="/pastEvents" component={PastEventsView} />
        <PrivateRoute path="/voteTopics" component={TopicListView} />
        <PrivateRoute path="/leaderboard" component={LeaderboardView} />
        <PrivateRoute path="/profile" component={ProfileView} />

        <Route exact component={NotFoundPageView} />
      </Switch>
    </Fragment>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
