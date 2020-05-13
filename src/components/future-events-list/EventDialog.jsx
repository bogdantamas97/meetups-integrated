import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { blue, grey } from "@material-ui/core/colors";

const styles = theme => ({
  typography: theme.typography,
  dialogContent: {
    padding: theme.spacing.unit * 2
  },
  dialogButton: {
    color: blue[300],
    borderTop: `1px solid lightgray`,
    margin: "auto",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: grey[300],
    },
  },
  highlightedWord: {
    color: "blue"
  },
  title: {
    margin: "auto",
  }
});

const Transition = (props) => <Slide direction="down" {...props} />;

const EventDialog = props => {

  const { classes } = props;
  const [titleMessage, setTitleMessage] = useState("");
  const [coloredWord, setColoredWord] = useState("");
  const [contentMessage, setContentMessage] = useState("");

  useEffect(() => {
    switch (props.dialogType) {
      case "subscribe":
        setTitleMessage("You have been ");
        setColoredWord("subscribed");
        setContentMessage("You will be notified a few days before the event. You can unsubscribe at any time.");
        break;
      case "waitinglist":
        setTitleMessage( "You have joined the ");
        setColoredWord("waiting list");
        setContentMessage("You will be notified as soon as a place will be available.");
        break;
      case "unsubscribe":
        setTitleMessage("You have been ");
        setColoredWord("unsubscribed");
        setContentMessage("Your place will be available for the first person in the waiting list.");
        break;
      case "error":
        setTitleMessage("Failure");
        setContentMessage("We are sorry, something went wrong!");
        break;
      default:
        break;
    }
  });

    return (
      <div>
        <Dialog
          onClose={props.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="customized-dialog-title"
          open={props.isOpen}
        >
          <DialogTitle id="customized-dialog-title" className = {classes.title} onClose={props.handleClose}>
            {titleMessage}
            <span className={classes.highlightedWord}>
              {coloredWord}
            </span>
            !
          </DialogTitle>
          <DialogContent>
            <Typography>{contentMessage}</Typography>
          </DialogContent>
          <DialogActions className={classes.dialogButton}>
            <Button onClick={props.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

EventDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventDialog);
