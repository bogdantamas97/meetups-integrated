import React, { Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BottomNavigation, Paper, withStyles } from "@material-ui/core";

const styles = {
  paper: {
    backgroundColor: "#22306F ",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    border: "3px double rgba(30,111,164,0.6)",
    borderRadius: "5px 5px 0px 0px"
  },
};

const FooterBar = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <BottomNavigation></BottomNavigation>
      </Paper>
    </Fragment>
  );
};

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterBar);
