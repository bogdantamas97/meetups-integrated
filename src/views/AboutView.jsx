import React from "react";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import About from "../components/About.jsx";

const AboutView = () => (
  <MuiThemeProvider theme={theme}>
    <About />
  </MuiThemeProvider>
);

export default AboutView;
