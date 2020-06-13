import React from "react";
import FutureEvents from "../components/futureEvents/FutureEvents.jsx";
import { theme } from "../globalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const FutureEventView = () => (
  <MuiThemeProvider theme={theme}>
    <FutureEvents />
  </MuiThemeProvider>
);

export default FutureEventView;
