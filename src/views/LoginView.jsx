import React from "react";
import LoginPage from "../components/signing/LoginPage.jsx"
import { theme } from "../GlobalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const LoginView = props =>(
    <MuiThemeProvider theme={theme}>
        <LoginPage/>
    </MuiThemeProvider>
);

export default LoginView;
