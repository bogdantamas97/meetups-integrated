import React, { useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  Snackbar,
  withStyles,
} from "@material-ui/core";
import { button, theme } from "../GlobalTheme/globalTheme";
import { Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import LayoutLogin from "../layouts/LayoutLogin.jsx";
import { Background } from "../GlobalTheme/globalTheme";
import red from "@material-ui/core/colors/red";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const apiBaseUrl = "http://localhost:8000/";

const styles = {
  formStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "100%",
    width: "100%",
    paddingBottom: "15vh",
    paddingTop: "15vh",
  },
  inputField: {
    color: "white",
    height: "50%",
    marginTop: 5,
    marginBottom: 5,
    width: "60%",
    maxWidth: 400,
    borderRadius: 5,
    paddingLeft: 4,
    paddingBottom: 5,
  },
  clearButton: {
    color: "#fff",
    fontStyle: "normal",
    textTransform: "none",
    fontWeight: "normal",
    height: 35,
    width: "80%",
    maxWidth: 300,
    margin: "12px 0px",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[900],
    },
  },
  inputText: {
    color: "white",
    height: "50%",
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
  helperText: {
    fontStyle: "italic",
    color: "red",
  },
  arrowBackIcon: {
    color: "white",
    width: 50,
    height: 50,
    display: "absolute",
    "&:hover": {
      backgroundColor: "gray",
    },
  },
};
button.width = "80%";
button.marginTop = 30;
button.maxWidth = 300;
// const clearButton = button;
// clearButton.backgroundColor="red";

const Alert = (props) => <MuiAlert elevation={10} variant="filled" {...props} />;

const RegisterForm = (props) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // handle form reaction
  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [isOpen, setOpen] = useState(false);

  // handling errors
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    false
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearFields = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setPasswordConfirmation("");

    setEmailError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);
  };

  const invalidEmail = (email) => {
    if (email === "" || !regex.test(email)) return true;
    return false;
  };

  const invalidFirstName = (firstName) => {
    if (firstName === "" || firstName.length < 5) return true;
    return false;
  };
  const invalidLastName = (lastName) => {
    if (lastName === "" || lastName.length < 5) return true;
  };

  const invalidPassword = (password) => {
    if (
      password === "" ||
      password.length < 8
    )
      return true;
    return false;
  };

  const invalidPasswordConfirmation = (passwordConfirmation) => {
    if (
      passwordConfirmation === "" ||
      passwordConfirmation.length < 8 ||
      passwordConfirmation !== password
    )
      return true;
    return false;
  };

  const handleSubmit = () => {

    setOpen(false);
    setEmailError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);

    // check fields
    if (invalidEmail(email)) setEmailError(true);
    if (invalidFirstName(firstName)) setFirstNameError(true);
    if (invalidLastName(lastName)) setLastNameError(true);
    if (invalidPassword(password)) setPasswordError(true);
    if (invalidPasswordConfirmation(passwordConfirmation))
      setPasswordConfirmationError(true);

    const isFormInvalid = invalidEmail(email) || invalidFirstName(firstName) || invalidLastName(lastName) || invalidPassword(password) || invalidPasswordConfirmation(passwordConfirmation); 
    
    // register an user
    if (!isFormInvalid) {
      setSnackbarTitle("You have registered succesfully!");
      setSnackbarType("success");
      handleClearFields()

      setOpen(true);
      axios
        .post(
          apiBaseUrl +
            "insert?firstname=" +
            firstName +
            "&lastname=" +
            lastName +
            "&email=" +
            email +
            "&password=" +
            password
        )
        .then(function (response) {
          if (response.data.code === 200) {
            console.log('what is that');
           ;
          }
        })
        .catch(() => {
          setSnackbarTitle("Your registration failed");
          setSnackbarType("error");
        });
      }
  };

  const classes = props.classes;

  return (
    <MuiThemeProvider theme={theme}>
      <LayoutLogin backgroundStyle={Background}>
        <Route
          render={({ history }) => (
            <ArrowBackIcon
              className={classes.arrowBackIcon}
              onClick={() => history.push("/")}
            />
          )}
        />
        <FormControl className={classes.formStyle} onSubmit={handleSubmit}>
          <TextField
            className={classes.inputField}
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
                input: classes.inputText,
              },
            }}
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              if (!invalidEmail(event.target.value)) {
                setEmailError(false);
              }
            }}
            variant="outlined"
            value={email}
            error={emailError}
          />
          <TextField
            className={classes.inputField}
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
                input: classes.inputText,
              },
            }}
            label="First name"
            onChange={(event) => {
              setFirstName(event.target.value);
              if (!invalidFirstName(event.target.value)) {
                setFirstNameError(false);
              }
            }}
            variant="outlined"
            value={firstName}
            error={firstNameError}
          />
          <TextField
            className={classes.inputField}
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
                input: classes.inputText,
              },
            }}
            label="Last Name"
            onChange={(event) => {
              setLastName(event.target.value)              
              if (!invalidLastName(event.target.value)) {
                setLastNameError(false);
              }
            }
            }
            variant="outlined"
            value={lastName}
            error={lastNameError}
          />
          <TextField
            type="password"
            className={classes.inputField}
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
                input: classes.inputText,
              },
            }}
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value)
              if (!invalidPassword(event.target.value)) {
                setPasswordError(false);
              }
            }}
            variant="outlined"
            value={password}
            error={passwordError}
          />
          <TextField
            type="password"
            className={classes.inputField}
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
                input: classes.inputText,
              },
            }}
            label="Password Confirmation"
            onChange={(event) => {
              setPasswordConfirmation(event.target.value)
              if (!invalidPasswordConfirmation(event.target.value)) {
                setPasswordConfirmationError(false);
              }
            }}
            variant="outlined"
            value={passwordConfirmation}
            error={passwordConfirmationError}
          />
          <Button style={button} onClick={handleSubmit}>
            Register
          </Button>
          <Button className={classes.clearButton} onClick={handleClearFields}>
            Clear Fields
          </Button>
          <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={5000}>
            <Alert onClose={handleClose} severity={snackbarType}>
              {snackbarTitle}
            </Alert>
          </Snackbar>
        </FormControl>
      </LayoutLogin>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(RegisterForm);
