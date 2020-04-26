import React, { useState } from "react";
import LayoutLogin from "../layouts/LayoutLogin";
import { theme, Background } from "../GlobalTheme/globalTheme";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Typography, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button/index";
import green from "@material-ui/core/colors/green";
import Cookie from 'js-cookie';
import axios from "axios/index";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

const apiBaseUrl = "http://localhost:9000";
const inOneHour = 1/24;

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
      backgroundColor: green[700]
    }
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    height: 250,
    width: "70%",
    marginTop: "30%"
  },
  input: {
    color: "white",
    height: "50%"
  },
  emailInput: {
    display: "flex",
    flexWrap: "wrap",
    color: "white"
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

const LoginPage = (props) => {

  const classes = props.classes;

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(Cookie.get("token") !== undefined);
    
  const handleSubmit = () => {
    axios.get(apiBaseUrl)
   .then((response)=> {
    if(response.data.filter((user)=> user.email === email)[0])
      if(response.data.filter((user)=> user.password === password)[0]){
        Cookie.set("token", response.data.filter((user)=> user.password === password)[0].id);
        setLoggedIn(true);
      } 
      else alert("Wrong password!");
    else alert("Username doesn't exist!");
   })
   .catch(() => {
     console.log('Unknown error');
   });
  }

    if (isLoggedIn) {
      return <Redirect to="/" />;
    } else
      return (
        <LayoutLogin backgroundStyle={Background}>
          <ValidatorForm
            className={classes.formStyle}
            onSubmit={handleSubmit}
          >
            <TextValidator
              className={classes.emailInput}
              onChange = {(event) => setEmail(event.target.value)}
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
                  input: classes.input
                }
              }}
              label="Email"
              variant="outlined"
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Email is not valid"]}
            />
            <TextValidator
              className={classes.passwordInput}
              onChange={(event) => setPassword(event.target.value)}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                  input: classes.input
                }
              }}
              type="Password"
              label="Password"
              variant="outlined"
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.loginButton}
            >
              <Typography
                style={{
                  color: theme.palette.primary.contrastText,
                  fontSize: theme.typography.subheading.fontSize
                }}
              >
                Login
              </Typography>
            </Button>
            <Route render={({history}) => {
              isLoggedIn && history.push("/main") 
              return (
                <Button onClick={() => history.push("/register")}>
                   <Typography
                    style={{
                      color: theme.palette.primary.contrastText,
                      fontSize: theme.typography.subheading.fontSize
                    }}
                   >
                      Don't have an account? Sign up.
                   </Typography>
                 
                </Button>
            )}}/>
          </ValidatorForm>
        </LayoutLogin>
      );
  }

export default withStyles(styles)(LoginPage);
