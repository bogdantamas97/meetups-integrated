import React from "react";
import Profile from "../components/profile/Profile.jsx";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const ProfileView = props => (
  <MuiThemeProvider theme={theme}>
    <Profile userId={2} />
  </MuiThemeProvider>
);

export default ProfileView;
