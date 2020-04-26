import React from "react";
import RegisterPage from "../components/RegisterPage"
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const RegisterView = props =>(
    <MuiThemeProvider theme={theme}>
        <RegisterPage/>
    </MuiThemeProvider>
);

export default RegisterView;
