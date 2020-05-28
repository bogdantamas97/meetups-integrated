import React from "react";
import { theme } from "../GlobalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import About from "../components/About.jsx";

const AboutView = () => (
  <MuiThemeProvider theme={theme}>
    <About />
  </MuiThemeProvider>
);

export default AboutView;
