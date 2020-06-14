import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Slide,
  withStyles,
} from "@material-ui/core";

import { eventDialogStyles } from "../../styles";

const Transition = (props) => <Slide direction="down" {...props} />;

const EventDialog = (props) => {
  const { classes, dialogType, handleClose, isOpen } = props;

  const [titleMessage, setTitleMessage] = useState("");
  const [coloredWord, setColoredWord] = useState("");
  const [contentMessage, setContentMessage] = useState("");

  useEffect(() => {
    switch (dialogType) {
      case "subscribe":
        setTitleMessage("You have been ");
        setColoredWord("subscribed");
        setContentMessage(
          "You will be notified a few days before the event. You can unsubscribe at any time."
        );
        break;
      case "waitinglist":
        setTitleMessage("You have joined the ");
        setColoredWord("waiting list");
        setContentMessage(
          "You will be notified as soon as a place will be available."
        );
        break;
      case "unsubscribe":
        setTitleMessage("You have been ");
        setColoredWord("unsubscribed");
        setContentMessage(
          "Your place will be available for the first person in the waiting list."
        );
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
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          className={classes.title}
          onClose={handleClose}
        >
          {titleMessage}
          <span className={classes.highlightedWord}>{coloredWord}</span>!
        </DialogTitle>
        <DialogContent>
          <Typography>{contentMessage}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogButton}>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EventDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(eventDialogStyles)(EventDialog);
