import React from "react";
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import About from "../components/infoAndNavigation/About.jsx";

const AboutView = () => (
  <MuiThemeProvider theme={theme}>
    <About />
  </MuiThemeProvider>
);

export default AboutView;
