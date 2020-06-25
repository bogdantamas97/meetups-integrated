import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import {
  Button,
  FormControl,
  TextField,
  Snackbar,
  Tooltip,
  ThemeProvider as MuiThemeProvider,
  withStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Background, button, registerPageStyles } from "../../styles";
import { theme } from "../../styles/globalTheme";
import { Alert } from "../../utils";
import { LayoutLogin } from "../../layouts";
import { DATA_BASE_URL, EMAIL_REGEX } from "../../constants";

button.width = "100%";
button.height = "70px";
button.marginTop = 40;
button.maxWidth = 400;

const RegisterForm = (props) => {
  const { classes } = props;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [isOpen, setOpen] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    false
  );

  useEffect(() => {
    document.addEventListener("keyup", onKeyEnterPressed);
    return () => {
      document.removeEventListener("keyup", onKeyEnterPressed);
    };
  }, []);

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
    if (email === "" || !EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return true;
    }

    async function fetchData() {
      const result = await axios(DATA_BASE_URL);

      if (result.data.find((item) => item.email === email)) {
        setEmailError(true);
        setOpen(true);
        return true;
      }
    }

    fetchData();

    return false;
  };

  const invalidFirstName = (firstName) => {
    if (firstName === "") {
      setFirstNameError(true);

      return true;
    }
    return false;
  };
  const invalidLastName = (lastName) => {
    if (lastName === "") {
      setLastNameError(true);
      return true;
    }
  };

  const invalidPassword = (password) => {
    if (password === "" || password.length < 8) {
      setPasswordError(true);
      return true;
    }
    return false;
  };

  const invalidPasswordConfirmation = (passwordConfirmation) => {
    if (
      passwordConfirmation === "" ||
      passwordConfirmation.length < 8 ||
      passwordConfirmation !== password
    ) {
      setPasswordConfirmationError(true);
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    setOpen(false);
    setEmailError(invalidEmail(email));
    setFirstNameError(invalidFirstName(firstName));
    setLastNameError(invalidLastName(lastName));
    setPasswordError(invalidPassword(password));
    setPasswordConfirmationError(
      invalidPasswordConfirmation(passwordConfirmation)
    );

    const isFormInvalid =
      invalidEmail(email) ||
      invalidFirstName(firstName) ||
      invalidLastName(lastName) ||
      invalidPassword(password) ||
      invalidPasswordConfirmation(passwordConfirmation);

    console.log(email, firstName, lastName, password, isFormInvalid);

    if (!isFormInvalid) {
      setSnackbarTitle("You have registered succesfully!");
      setSnackbarType("success");
      handleClearFields();

      setOpen(true);
      axios
        .post(
          DATA_BASE_URL +
            "/insert?firstname=" +
            firstName +
            "&lastname=" +
            lastName +
            "&email=" +
            email +
            "&password=" +
            Buffer.from(password).toString("base64")
        )
        .catch(() => {
          setSnackbarTitle("Your registration failed");
          setSnackbarType("error");
        });
    }
  };

  const onKeyEnterPressed = (event) => {
    if (event.keyCode === 13 && !!email) {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <LayoutLogin backgroundStyle={Background}>
        <Route
          render={({ history }) => (
            <Tooltip title="Back to login">
              <ArrowBackIcon
                className={classes.arrowBackIcon}
                onClick={() => history.push("/")}
              />
            </Tooltip>
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
            onKeyDown={onKeyEnterPressed}
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
            onKeyDown={onKeyEnterPressed}
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
              setLastName(event.target.value);
              if (!invalidLastName(event.target.value)) {
                setLastNameError(false);
              }
            }}
            variant="outlined"
            onKeyDown={onKeyEnterPressed}
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
              setPassword(event.target.value);
              if (!invalidPassword(event.target.value)) {
                setPasswordError(false);
              }
            }}
            variant="outlined"
            onKeyDown={onKeyEnterPressed}
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
              setPasswordConfirmation(event.target.value);
              if (!invalidPasswordConfirmation(event.target.value)) {
                setPasswordConfirmationError(false);
              }
            }}
            variant="outlined"
            onKeyDown={onKeyEnterPressed}
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
            <Alert elevation={10} onClose={handleClose} severity={snackbarType}>
              {snackbarTitle}
            </Alert>
          </Snackbar>
        </FormControl>
      </LayoutLogin>
    </MuiThemeProvider>
  );
};

export default withStyles(registerPageStyles)(RegisterForm);
