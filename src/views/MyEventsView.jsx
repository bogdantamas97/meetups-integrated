import React from "react";
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import MyEvents from "../components/myEvents/MyEvents.jsx";

const MyEventsView = () => (
  <MuiThemeProvider theme={theme}>
    <MyEvents />
  </MuiThemeProvider>
);

export default MyEventsView;
