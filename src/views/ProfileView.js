import React from "react";
import Profile from "../components/profile/Profile";
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Cookies from "universal-cookie";

const ProfileView = props => (
  <MuiThemeProvider theme={theme}>
    <Profile userId={parseInt(new Cookies().get("token").substring(6))} />
  </MuiThemeProvider>
);

export default ProfileView;
