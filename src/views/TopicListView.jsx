import React from "react";
import TopicList from "../components/vote-topics-list/TopicList";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const PastEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <TopicList />
  </MuiThemeProvider>
);

export default PastEventsView;
