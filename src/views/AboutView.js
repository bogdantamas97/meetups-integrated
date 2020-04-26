import React from "react";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import About from "../components/About";

const AboutView = props => (
  <MuiThemeProvider theme={theme}>
    <About />
  </MuiThemeProvider>
);

export default AboutView;
