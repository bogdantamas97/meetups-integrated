import React, {useState} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from '@material-ui/core/Link';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Cookie from 'js-cookie';
import { Route } from "react-router-dom";

const apiBaseUrl = "http://localhost:8000";
const inOneHour = 1/24;

const LoginForm = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [isLoggedIn, setLoggedIn] = useState(Cookie.get("token") !== undefined);
    
  const handleClick = () => {

    if(email === "bogdan@yahoo.com"){
      if(password === "sistem"){
        const inOneHour = 1/24;
        Cookie.set("token", email, { expires: inOneHour });
        setLoggedIn(true);
      } 
      else alert("Wrong password!");
    }
    else alert("Username doesn't exist!");
  }

  return (
      <div>
        <MuiThemeProvider>
       
        </MuiThemeProvider>
        <MuiThemeProvider>
        <div>
        </div>
        </MuiThemeProvider>
        <MuiThemeProvider key={"theme"}>
      <div>
      <TextField
        hintText="Enter your email"
        floatingLabelText="Email"
        required
        onChange = {(event) => setEmail(event.target.value)}
        />
      <br/>
        <TextField
        type="password"
        hintText="Enter your Password"
        floatingLabelText="Password"
        required
        onChange={(event) => setPassword(event.target.value)}
          />
        <br/>
        <RaisedButton label="Login" primary={true} style={style} onClick={(event) => handleClick(event)}/>
        <Route render={({history}) => {
        isLoggedIn && history.push("/main") 
        return (
          <Link href="" onClick={() => history.push("/register")}>
            Don't have an account?Sign up.
          </Link>
        )}}/>
        
     </div>
      </MuiThemeProvider>
    </div>
        );
}

const style = {
  margin: 15,
};

export default LoginForm;