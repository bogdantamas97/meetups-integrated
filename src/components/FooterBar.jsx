import React, { Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  MenuItem,
  TextField,
  Checkbox,
  BottomNavigation,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  withStyles,
  requirePropFactory,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { button, footerBar, theme } from "../GlobalTheme/globalTheme.js";

const styles = {
  footerBar: footerBar,
};

const FooterBar = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Paper style={{ height: "100%" }}>
        <BottomNavigation className={classes.footerBar}></BottomNavigation>
      </Paper>
    </Fragment>
  );
};

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterBar);
