import React from "react";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Achievements from "../components/achievements/Achievements";

const AchievementsView = () => (
  <MuiThemeProvider theme={theme}>
    <Achievements />
  </MuiThemeProvider>
);

export default AchievementsView;
