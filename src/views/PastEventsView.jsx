import React from "react";
import PastEvents from "../components/past-events-list/PastEvents.jsx";
import { theme } from "../GlobalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const PastEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <PastEvents />
  </MuiThemeProvider>
);

export default PastEventsView;
