import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Snackbar,
  FormControl,
  withStyles,
} from "@material-ui/core";

import { theme } from "../../styles/globalTheme";
import { Background, loginPageStyles } from "../../styles/";
import { LayoutLogin } from "../../layouts";
import { Alert } from "../../utils";
import { EMAIL_REGEX, DATA_BASE_URL, IN_ONE_HOUR } from "../../constants";

const LoginPage = (props) => {
  const { classes } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [isOpen, setOpen] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(!!Cookies.get("token"));

  const invalidEmail = (email) => {
    if (email === "" || !EMAIL_REGEX.test(email)) return true;
    return false;
  };

  const invalidPassword = (password) => {
    if (password === "" || password.length < 8) return true;
    return false;
  };

  const setSnackbar = (title, type) => {
    setSnackbarTitle(title);
    setSnackbarType(type);
  };

  const onKeyEnterPressed = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setEmailError(invalidEmail(email));
    setPasswordError(invalidPassword(password));

    setOpen(true);

    if (email.length !== 0 && password.length !== 0) {
      if (!invalidEmail(email) && !invalidPassword(password)) {
        axios.get(DATA_BASE_URL).then((response) => {
          const isTheEmailRegistered = response.data.filter(
            (user) => user.email === email
          )[0];
          const isThePasswordCorrect = response.data.filter(
            (user) =>
              Buffer.from(user.password, "base64").toString() === password
          )[0];

          if (isTheEmailRegistered) {
            if (isThePasswordCorrect) {
              const currentToken = response.data.filter(
                (user) => user.email === email
              )[0].id;

              Cookies.set("token", currentToken, { expires: IN_ONE_HOUR });
              setLoggedIn(true);
              setSnackbar("Login succesfully!", "success");
            } else {
              setSnackbar("Wrong password!", "error");
            }
          } else {
            setSnackbar("Email is not registered!", "error");
          }
        });
      } else {
        setSnackbar("Invalid data!", "error");
      }
    } else {
      setSnackbar("All fields are required!", "error");
    }
  };

  const handleClose = () => setOpen(false);

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  } else
    return (
      <LayoutLogin backgroundStyle={Background}>
        <FormControl
          id="the_form"
          className={classes.formStyle}
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.emailInput}
            onChange={(event) => {
              setEmail(event.target.value);
              if (!invalidEmail(event.target.value)) {
                setEmailError(false);
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.input,
              },
            }}
            label="Email"
            variant="outlined"
            onKeyDown={onKeyEnterPressed}
            error={emailError}
          />
          <TextField
            className={classes.passwordInput}
            onChange={(event) => {
              setPassword(event.target.value);
              if (!invalidPassword(event.target.value)) {
                setPasswordError(false);
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.input,
              },
            }}
            type="Password"
            label="Password"
            variant="outlined"
            onKeyDown={onKeyEnterPressed}
            error={passwordError}
          />
          <Button
            type="submit"
            variant="contained"
            className={classes.loginButton}
            onClick={handleSubmit}
          >
            <Typography
              style={{
                color: theme.palette.primary.contrastText,
                fontSize: theme.typography.subheading.fontSize,
              }}
            >
              Login
            </Typography>
          </Button>
          <Route
            render={({ history }) => {
              isLoggedIn && history.push("/profile");
              return (
                <Button onClick={() => history.push("/register")}>
                  <Typography className={classes.signUp}>
                    Don't have an account? Sign up.
                  </Typography>
                </Button>
              );
            }}
          />
          <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={5000}>
            <Alert elevation={5} onClose={handleClose} severity={snackbarType}>
              {snackbarTitle}
            </Alert>
          </Snackbar>
        </FormControl>
      </LayoutLogin>
    );
};

export default withStyles(loginPageStyles)(LoginPage);
