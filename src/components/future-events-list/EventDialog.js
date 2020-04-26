import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
  typography: theme.typography,
  dialogContent: {
    padding: theme.spacing.unit * 2
  },
  dialogButton: {
    color: theme.palette.grey[500],
    borderTop: `1px solid lightgray`
  },
  highlightedWord: {
    color: "blue"
  }
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class EventDialog extends React.Component {
  state = {
    titleMessage: "",
    coloredWord: "",
    contentMessage: ""
  };

  componentWillMount() {
    switch (this.props.dialogType) {
      case "subscribe":
        this.setState({
          titleMessage: "You have been ",
          coloredWord: "subscribed",
          contentMessage:
            "You will be notified a few days before the event. You can unsubscribe at any time."
        });
        break;
      case "waitinglist":
        this.setState({
          titleMessage: "You have joined the ",
          coloredWord: "waiting list",
          contentMessage:
            "You will be notified as soon as a place will be available."
        });
        break;
      case "unsubscribe":
        this.setState({
          titleMessage: "You have been ",
          coloredWord: "unsubscribed",
          contentMessage:
            "Your place will be available for the first person in the waiting list."
        });
        break;
      case "error":
        this.setState({
          titleMessage: "Failure",
          contentMessage:
            "We are sorry, something went wrong! Please contact us at comunicare@arobs.com."
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="customized-dialog-title"
          open={this.props.isOpen}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.state.titleMessage}
            <span className={classes.highlightedWord}>
              {this.state.coloredWord}
            </span>
            !
          </DialogTitle>
          <DialogContent>
            <Typography>{this.state.contentMessage}</Typography>
          </DialogContent>
          <DialogActions className={classes.dialogButton}>
            <Button onClick={this.props.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EventDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventDialog);
