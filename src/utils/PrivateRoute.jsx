import React from 'react';
import Cookie from 'js-cookie';
import {Route, Redirect} from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => 
    Cookie.get("token") ?
    <Route {...rest} render={(props) => {
        return(
            Cookie.get("token")
                ? <Component {...props} />
                : <Redirect to='/' />
            )}
        } />
        :
    <Redirect to='/'/>

