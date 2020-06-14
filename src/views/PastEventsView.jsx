import React from "react";
import PastEvents from "../components/pastEvents/PastEvents.jsx";
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const PastEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <PastEvents />
  </MuiThemeProvider>
);

export default PastEventsView;
