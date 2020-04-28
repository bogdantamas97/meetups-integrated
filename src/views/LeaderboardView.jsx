import React from "react";
import Leaderboard from "../components/leaderboard/Leaderboard.jsx";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const LeaderboardView = () => (
  <MuiThemeProvider theme={theme}>
    <Leaderboard />
  </MuiThemeProvider>
);

export default LeaderboardView;
