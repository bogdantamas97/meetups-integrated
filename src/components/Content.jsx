import React from "react";
import { withStyles } from "@material-ui/core";
import { theme } from "../GlobalTheme/globalTheme";

const styles = {
  content: {
    backgroundColor: theme.palette.secondary.light,
    height: "100%",
    display: "flex",
    justifyContent: "center",
  }
};

const Content = (props) =>
{
    const { classes } = props;
    return <div className={classes.content}>{props.children}</div>;
}

export default withStyles(styles)(Content);
