import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {PrivateRoute} from "../utils/PrivateRoute";

import RegisterForm from '../components/RegisterForm';
import MainPage from '../components/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const RoutesHandler = () =>{

    return(
   <Router>
      <div>
        <MuiThemeProvider key={"theme"}>
          <Switch>
            <Route path="/register" component={RegisterForm}>
             <RegisterForm/>
            </Route>
            <PrivateRoute path="/map" component={MainPage}>
              <MainPage/>
            </PrivateRoute> 
          </Switch>
        </MuiThemeProvider>
      </div>
    </Router>
    );
}

export default RoutesHandler;


