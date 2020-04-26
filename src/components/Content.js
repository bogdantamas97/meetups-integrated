import React from "react";
import { withStyles } from "@material-ui/core";
import { theme } from "../GlobalTheme/globalTheme";

const styles = {
  content: {
    backgroundColor: theme.palette.secondary.light,
    height: "100%",
    display: "flex",
    justifyContent: "center"
  }
};

class Content extends React.Component {
  render() {
    const classes = this.props.classes;
    return <div className={classes.content}>{this.props.children}</div>;
  }
}

export default withStyles(styles)(Content);
