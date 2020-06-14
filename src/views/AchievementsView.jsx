import React from "react";
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Achievements from "../components/achievements/Achievements.jsx";

const AchievementsView = () => (
  <MuiThemeProvider theme={theme}>
    <Achievements />
  </MuiThemeProvider>
);

export default AchievementsView;
