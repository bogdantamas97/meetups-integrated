import React from "react";
import LoginPage from "../components/LoginPage.jsx"
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const LoginView = props =>(
    <MuiThemeProvider theme={theme}>
        <LoginPage/>
    </MuiThemeProvider>
);

export default LoginView;
