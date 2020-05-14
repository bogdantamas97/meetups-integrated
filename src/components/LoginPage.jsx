import React, { useState } from "react";
import LayoutLogin from "../layouts/LayoutLogin.jsx";
import { theme, Background } from "../GlobalTheme/globalTheme";
import {
  Button,
  Typography,
  TextField,
  Snackbar,
  FormControl,
  withStyles,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import MuiAlert from "@material-ui/lab/Alert";
import Cookies from "js-cookie";
import axios from "axios/index";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

const apiBaseUrl = "http://localhost:8000";
const inOneHour = 1 / 24;

const styles = {
  loginButton: {
    color: "#fff",
    fontStyle: "normal",
    textTransform: "none",
    fontWeight: "normal",
    height: 50,
    width: "100%",
    margin: "12px 0px",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[900],
    },
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    height: 250,
    width: "50%",
    marginTop: "30%",
  },
  input: {
    color: "white",
    height: "50%",
  },
  emailInput: {
    display: "flex",
    flexWrap: "wrap",
    color: "white",
  },
  cssLabel: {
    color: "white",
    "&$cssFocused": {
      color: "white",
    },
  },
  cssFocused: {
    color: "white",
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "white",
    },
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "white !important",
  },
  signUp: {
    color: "white",
    "&:hover": {
      backgroundColor: "gray",
    },
  },
};

const Alert = (props) => <MuiAlert elevation={5} variant="filled" {...props} />;

const LoginPage = (props) => {

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { classes } = props;

  // fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form reaction
  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [isOpen, setOpen] = useState(false);

  // handling errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // check if its logged in
  const [isLoggedIn, setLoggedIn] = useState(!!Cookies.get("token"));

  const invalidEmail = (email) => {
    console.log()
    if (email === "" || !regex.test(email)) return true;
    return false;
  };

  const invalidPassword = (password) => {
    if (password === "" || password.length < 8) return true;
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onKeyEnterPressed = event => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }

  const handleSubmit = () => {

    setEmailError(invalidEmail(email));
    setPasswordError(invalidPassword(password));

    setOpen(true);

    if (email.length !== 0 && password.length !== 0) {
      if (!invalidEmail(email) && !invalidPassword(password)) {
        axios.get(apiBaseUrl).then((response) => {
          if (response.data.filter((user) => user.email === email)[0])
            if (response.data.filter((user) => user.password === password)[0]) {
              Cookies.set(
                "token",
                response.data.filter((user) => user.password === password)[0]
                  .id,
                { expires: inOneHour }
              );
              setLoggedIn(true);
              setSnackbarTitle("Login succesfully!");
              setSnackbarType("success");
            } else {
              setSnackbarTitle("Wrong password!");
              setSnackbarType("error");
            }
          else {
            setSnackbarTitle("Email is not registered!");
            setSnackbarType("error");
          }
        });
      } else {
        setSnackbarTitle("Invalid data");
        setSnackbarType("error");
      }
    } else {
      setSnackbarTitle("All fields are required!");
      setSnackbarType("error");
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  } else
    return (
      <LayoutLogin backgroundStyle={Background}>
        <FormControl id="the_form" className={classes.formStyle} onSubmit={handleSubmit}>
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
            <Alert onClose={handleClose} severity={snackbarType}>
              {snackbarTitle}
            </Alert>
          </Snackbar>
        </FormControl>
      </LayoutLogin>
    );
};

export default withStyles(styles)(LoginPage);
