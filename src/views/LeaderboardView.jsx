import React from "react";
import Leaderboard from "../components/leaderboard/Leaderboard.jsx";
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const LeaderboardView = () => (
  <MuiThemeProvider theme={theme}>
    <Leaderboard />
  </MuiThemeProvider>
);

export default LeaderboardView;
