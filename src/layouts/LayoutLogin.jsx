import React from "react";
import Grid from "@material-ui/core/Grid";

const LayoutLogin = (props) => {
  const { backgroundStyle, children } = props;
  return (
    <Grid className="LayoutLogin" style={backgroundStyle}>
      {children}
    </Grid>
  );
};

export default LayoutLogin;
