import React from "react";
import FutureEvents from "../components/future-events-list/FutureEvents.jsx";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const FutureEventView = () => (
  <MuiThemeProvider theme={theme}>
    <FutureEvents />
  </MuiThemeProvider>
);

export default FutureEventView;
