import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import NotFoundPageView from "./views/NotFoundPageView";
import LeaderboardView from "./views/LeaderboardView";
import ProfileView from "./views/ProfileView";
import RegisterView from "./views/RegisterView";
import AboutView from "./views/AboutView";
import AchievementsView from "./views/AchievementsView";
import Cookies from "universal-cookie";
import FutureEventsView from "./views/FutureEventsView";
import PastEventsView from "./views/PastEventsView";
import LoginView from "./views/LoginView";
import MyEventsView from "./views/MyEventsView";
import TopicList from "./components/vote-topics-list/TopicList";

const checkToken = () => {
  return new Cookies().get("token");
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const routing = (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={App} />
        <PrivateRoute path="/achievements" component={AchievementsView} />
        <Route exact path="/login" component={LoginView} />
        <PrivateRoute path="/myEvents" component={MyEventsView} />
        <PrivateRoute path="/futureEvents" component={FutureEventsView} />
        <PrivateRoute path="/pastEvents" component={PastEventsView} />
        <Route path="/about" component={AboutView} />
        <Route exact path="/register" component={RegisterView} />
        <PrivateRoute path="/voteTopics" component={TopicList} />
        <PrivateRoute path="/leaderboard" component={LeaderboardView} />
        <PrivateRoute path="/profile" component={ProfileView} />
        <PrivateRoute path="/voteTopics" component={TopicList}/>
        <Route path="/main" component={App} />
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
