import React from "react";
import TopicList from "../components/voteTopics/TopicList";
import { theme } from "../GlobalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const PastEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <TopicList />
  </MuiThemeProvider>
);

export default PastEventsView;
