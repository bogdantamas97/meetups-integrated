import React from "react";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MyEvents from "../components/MyEvents";

const MyEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <MyEvents />
  </MuiThemeProvider>
);

export default MyEventsView;
