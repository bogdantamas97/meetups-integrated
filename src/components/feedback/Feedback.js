import React, { Component } from "react";
import {
  DialogTitle,
  DialogContent,
  Dialog,
  Grid,
  withStyles
} from "@material-ui/core";
import Category from "./Category";
import { ReactComponent as Logo } from "../../images/sad.svg";
import { ReactComponent as Logo2 } from "../../images/moresad.svg";
import { ReactComponent as Logo3 } from "../../images/third.svg";
import { ReactComponent as Logo4 } from "../../images/fourth.svg";
import { ReactComponent as Logo5 } from "../../images/fifth.svg";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = {
  button: {
    width: "30%"
  },
  logos: {
    width: "58%",
    marginLeft: "43%",
    marginTop: "100px",
    marginBottom: "10px"
  }
};

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clarity: "3",
      originality: "3",
      complexity: "3",
      engagement: "3",
      cursive: "3",
      isOpen: props.isOpen,
      feedbackList: []
    };
  }

  handleChangeClarity = event => {
    this.setState({ clarity: event.target.value });
  };
  handleChangeOriginality = event => {
    this.setState({ originality: event.target.value });
  };
  handleChangeComplexity = event => {
    this.setState({ complexity: event.target.value });
  };
  handleChangeEngagement = event => {
    this.setState({ engagement: event.target.value });
  };
  handleChangeCursive = event => {
    this.setState({ cursive: event.target.value });
  };

  handleClickSend = () => {
    const feedback = {};
    feedback.clarity = this.state.clarity;
    feedback.originality = this.state.originality;
    feedback.complexity = this.state.complexity;
    feedback.engagement = this.state.engagement;
    feedback.cursive = this.state.cursive;
    feedback.usersId = Number.parseInt(this.props.userId);

    axios
      .get(`http://localhost:3001/events/${this.props.eventId}`)
      .then(result => {
        let feedbackList = result.data.feedback;
        feedbackList.push(feedback);
        this.setState({ feedbackList });
      })
      .then(() => {
        axios.patch(
          `http://localhost:3001/events/${this.props.eventId}`,
          { feedback: this.state.feedbackList },
          { headers: { "Content-Type": "application/json" } }
        );
      });
    this.props.closeFeedbackDialog();
  };

  render() {
    const { classes, eventName } = this.props;
    return (
      <Dialog maxWidth="xs" fullWidth={true} open={this.props.isOpen}>
        <DialogTitle>Feedback for:{eventName}</DialogTitle>
        <DialogContent>
          <Grid container justify="space-evenly" className={classes.logos}>
            <Logo2 />
            <Logo />
            <Logo3 />
            <Logo4 />
            <Logo5 />
          </Grid>

          <Category
            value={this.state.clarity}
            handleChange={this.handleChangeClarity}
            category={"Clarity of content"}
          />
          <Category
            value={this.state.originality}
            handleChange={this.handleChangeOriginality}
            category={"Originality of the presentation"}
          />
          <Category
            value={this.state.complexity}
            handleChange={this.handleChangeComplexity}
            category={"Complexity of the subject"}
          />
          <Category
            value={this.state.engagement}
            handleChange={this.handleChangeEngagement}
            category={"Engagement with the audience"}
          />
          <Category
            value={this.state.cursive}
            handleChange={this.handleChangeCursive}
            category={"Cursive flow,good pace"}
          />

          <Grid container justify="space-evenly" style={{ marginTop: "150px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.handleClickCancel}
              style={styles.button}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickSend}
              style={styles.button}
            >
              Send
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Feedback);
