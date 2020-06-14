import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { BottomNavigation, Paper, withStyles } from "@material-ui/core";
import { footerBarStyles } from "../../styles";

const FooterBar = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <BottomNavigation />
      </Paper>
    </Fragment>
  );
};

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(footerBarStyles)(FooterBar);
