import React from "react";
import RegisterForm from "../components/RegisterForm"
import { theme } from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const RegisterView = props =>(
    <MuiThemeProvider theme={theme}>
        <RegisterForm/>
    </MuiThemeProvider>
);

export default RegisterView;
