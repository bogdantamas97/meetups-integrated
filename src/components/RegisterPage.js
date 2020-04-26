import React, { useState} from 'react'; 
import { Button, TextField, Snackbar, FormControl, withStyles } from "@material-ui/core";
import {
  button,
  theme
} from "../GlobalTheme/globalTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import LayoutLogin from "../layouts/LayoutLogin";
import { Background } from "../GlobalTheme/globalTheme";

const styles = {
  formStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "100%",
    width: "100%",
    paddingBottom: "15vh",
    paddingTop: "15vh"
  },
  inputField: {
    color: "white",
    height: "50%",
    marginTop: 5,
    marginBottom: 5,
    width: "60%",
    maxWidth: 450,
    borderRadius: 5,
    paddingLeft: 4,
    paddingBottom: 5,
  },
  inputText: {
    color: "white",
    height: "50%"
  },
  cssLabel: {
    color: "white",
    "&$cssFocused": {
      color: "white"
    }
  },
  cssFocused: {
    color: "white"
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "white"
    }
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "white !important"
  }
};
button.width = "60%";
button.marginTop = 10;
button.maxWidth = 450;

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const RegisterPage = (props) => {

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  //error handling
  const [snackbar, setSnackbar] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    setOpen(true);
    const apiBaseUrl = "http://localhost:8000/";
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email.length > 5){
        if(firstName.length > 5) {
          if(lastName.length > 5) {
            if(password.length > 5)
            {
                if(regex.test(email)){
                  if(password === passwordConfirmation)
                  {
                    setSnackbar('You have registered succesfully');
                    axios.post(apiBaseUrl+ "insert?firstname="+firstName+"&lastname="+lastName+"&email="+email+"&password="+password)
                    .then(function (response) {

                    if(response.data.code === 200){
                      console.log("Succes");
                    }

                    })
                    .catch(() =>  {
                    console.log('Unknown error');
                    });
                  }
                  else
                    alert("Password mismatch");

                }
                else {
                  setSnackbar('Your email is invalid');
                }
              }
              else{
                alert("Password too short");
              }
            }
            else{
            alert("First name too short");
            }
          }
          else{
          alert("Last name too short");
          }
        }
        else{
          alert("Email too short");
        }
      }

    const classes = props.classes;
    return (
        <MuiThemeProvider theme={theme}>
          <LayoutLogin backgroundStyle={Background}>
            <FormControl className={classes.formStyle} onSubmit={handleSubmit}>
                <TextField
                className={classes.inputField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputText
                  }
                }}
                label="Email"
                onChange = {(event) => setEmail(event.target.value)}
                variant="outlined"
                value={email}
                validators={["required", "isEmail"]}
              />
              <TextField
                 className={classes.inputField}
                 InputLabelProps={{
                   classes: {
                     root: classes.cssLabel,
                     focused: classes.cssFocused
                   }
                 }}
                 InputProps={{
                   classes: {
                     focused: classes.cssFocused,
                     notchedOutline: classes.notchedOutline,
                     input: classes.inputText
                   }
                 }}
                label="First name"
                onChange = {(event) => setFirstName(event.target.value)}
                variant="outlined"
                value={firstName}
              />
              <TextField
                className={classes.inputField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputText
                  }
                }}
                label="Last Name"
                onChange = {(event) => setLastName(event.target.value)}
                variant="outlined"
                value={lastName}
              />
              <TextField
                type="password"
                className={classes.inputField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputText
                  }
                }}
                label="Password"
                onChange = {(event) => setPassword(event.target.value)}
                variant="outlined"
                value={password}
              />
              <TextField
                type="password"
                className={classes.inputField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputText
                  }
                }}
                label="Password Confirmation"
                onChange = {(event) => setPasswordConfirmation(event.target.value)}
                variant="outlined"
                value={passwordConfirmation}
              />
              <Button style={button} onClick={handleSubmit}>
                Register
              </Button>
              <Snackbar open={isOpen} autoHideDuration={3000}>
                <Alert onClose={handleClose} severity="success">
                  This is a success message!
                </Alert>
              </Snackbar>
            </FormControl>
          </LayoutLogin>
        </MuiThemeProvider>
       
      );
}

export default withStyles(styles)(RegisterPage);
