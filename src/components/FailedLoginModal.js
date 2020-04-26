import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { theme } from "../GlobalTheme/globalTheme";
import { Typography, withStyles } from "@material-ui/core";

const styles = {
  backStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "40px",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: " flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalStyle: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    position: "relative",
    maxWidth: "500px",
    minHeight: "160px",
    borderRadius: "10px",
    backgroundColor: theme.palette.secondary.main,
    width: " 100%",
    zIndex: 1
  },
  modalTitle: {
    color: "red",
    fontWeight: "bold",
    fontSize: "18px",
    margin: "4px 0px"
  },
  modalButton: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center"
  },
  modalText: {
    fontSize: theme.typography.subheading.fontSize,
    color: theme.typography.subheading.color
  }
};

class FailedLoginModal extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    const classes = this.props.classes;
    if (!this.props.show) {
      return null;
    }
    return (
      <div className={classes.backStyle}>
        <div className={classes.modalStyle}>
          <p className={classes.modalTitle}>Login failed</p>
          <p className={classes.modalText}>Wrong email or password!</p>
          <div className={classes.modalButton}>
            <Button
              onClick={e => {
                this.onClose(e);
              }}
              style={{
                backgroundColor: theme.palette.primary.main,
                width: "60%"
              }}
            >
              <Typography style={{ color: theme.palette.primary.contrastText }}>
                OK
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FailedLoginModal);
