import React from "react";
import RegisterForm from "../components/signing/RegisterForm"
import { theme } from "../styles/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const RegisterView = props =>(
    <MuiThemeProvider theme={theme}>
        <RegisterForm/>
    </MuiThemeProvider>
);

export default RegisterView;
