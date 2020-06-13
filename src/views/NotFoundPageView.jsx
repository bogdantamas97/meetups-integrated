import React from "react";
import { theme } from "../globalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { errorImage as ErrorPage } from "../images/index";
import { withStyles } from "@material-ui/core";

const styles = {
  image: {
    height: "100%",
    width: "100%",
  },
};

const NotFoundPagesView = (props) => {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <img className={classes.image} alt="404" src={ErrorPage} />;
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(NotFoundPagesView);
