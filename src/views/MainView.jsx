import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";

import { LayoutLogin } from "../layouts/index";
import { ArobsBackgroundCenter } from "../GlobalTheme/globalTheme";

const styles = {
  buttonStyle: {
    color: "#1B4597",
    marginTop: 5 + "px",
    minWidth: 120 + "px",
    borderRadius: 20 + "px",
  },
  topButton: {
    marginTop: 20 + "px",
  },
  linkCss: {
    textDecoration: "none",
  },
};

class MainView extends Component {
  render() {
    return (
      <Fragment>
        <LayoutLogin backgroundStyle={ArobsBackgroundCenter}>
          <Link to="/register" style={styles.linkCss}>
            <Button variant="contained" style={styles.buttonStyle}>
              Register
            </Button>
          </Link>
          <Link to="/login" style={styles.linkCss}>
            <Button variant="contained" style={styles.buttonStyle}>
              Login
            </Button>
          </Link>
          <Link to="/about" style={styles.linkCss}>
            <Button variant="contained" style={styles.buttonStyle}>
              About
            </Button>
          </Link>
        </LayoutLogin>
      </Fragment>
    );
  }
}

MainView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainView);
