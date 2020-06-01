import React from "react";
import Grid from "@material-ui/core/Grid";

const LayoutLogin = (props) => {
  return (
    <Grid className="LayoutLogin" style={props.backgroundStyle}>
      {props.children}
    </Grid>
  );
};

export default LayoutLogin;
