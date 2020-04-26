import React from "react";
import PastEvents from "../components/past-events-list/PastEvents";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const PastEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <PastEvents />
  </MuiThemeProvider>
);

export default PastEventsView;
