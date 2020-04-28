import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import NotFoundPageView from "./views/NotFoundPageView.jsx";
import LeaderboardView from "./views/LeaderboardView.jsx";
import ProfileView from "./views/ProfileView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import AboutView from "./views/AboutView.jsx";
import AchievementsView from "./views/AchievementsView.jsx";
import { PrivateRoute } from "./utils/PrivateRoute";
import FutureEventsView from "./views/FutureEventsView.jsx";
import PastEventsView from "./views/PastEventsView.jsx";
import LoginView from "./views/LoginView.jsx";
import MyEventsView from "./views/MyEventsView.jsx";
import TopicList from "./components/vote-topics-list/TopicList.jsx";


const routing = (
  <Router>
    <Fragment>
      <Switch>
         <PrivateRoute path="/achievements" component={AchievementsView} />
        <Route exact path="/" component={LoginView} />
        <PrivateRoute path="/myEvents" component={MyEventsView} />
        <PrivateRoute path="/futureEvents" component={FutureEventsView} />
        <PrivateRoute path="/pastEvents" component={PastEventsView} />
        <Route path="/about" component={AboutView} />
        <Route exact path="/register" component={RegisterView} />
        <PrivateRoute path="/voteTopics" component={TopicList} />
        <PrivateRoute path="/leaderboard" component={LeaderboardView} />
        <Route path="/profile" component={ProfileView} />
        <PrivateRoute path="/voteTopics" component={TopicList}/>
        <Route path="/login" component={LoginView} />
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
