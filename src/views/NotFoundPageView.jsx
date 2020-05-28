import React from "react";
import { theme } from "../GlobalTheme/globalTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import ErrorPage from "../images/errorImage.png";
import {withStyles} from "@material-ui/core";

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