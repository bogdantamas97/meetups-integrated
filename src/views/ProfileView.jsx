import React from "react";
import Profile from "../components/profile/Profile.jsx";
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const ProfileView = props => (
  <MuiThemeProvider theme={theme}>
    <Profile />
  </MuiThemeProvider>
);

export default ProfileView;
