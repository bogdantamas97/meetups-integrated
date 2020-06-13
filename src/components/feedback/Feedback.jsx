import React, { useState } from "react";
import axios from "axios";
import {
  DialogTitle,
  DialogContent,
  Dialog,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";

import { ReactComponent as Logo } from "../../images/sad.svg";
import { ReactComponent as Logo2 } from "../../images/moresad.svg";
import { ReactComponent as Logo3 } from "../../images/third.svg";
import { ReactComponent as Logo4 } from "../../images/fourth.svg";
import { ReactComponent as Logo5 } from "../../images/fifth.svg";

import Category from "./Category.jsx";
import { EVENTS_URL } from "../../constants/index";

const styles = {
  title: {
    margin: "auto",
  },
  button: {
    width: "30%",
  },
  logos: {
    width: "58%",
    marginLeft: "43%",
    marginTop: "100px",
    marginBottom: "10px",
  },
};

const Feedback = (props) => {
  const { classes, eventName, eventId, userId, closeFeedbackDialog } = props;

  const [clarity, setClarity] = useState("3");
  const [originality, setOriginality] = useState("3");
  const [complexity, setComplexity] = useState("3");
  const [engagement, setEngagement] = useState("3");
  const [cursive, setCursive] = useState("3");

  const handleClickSend = () => {
    const feedback = {};

    feedback.clarity = clarity;
    feedback.originality = originality;
    feedback.complexity = complexity;
    feedback.engagement = engagement;
    feedback.cursive = cursive;
    feedback.userId = userId;

    axios.get(`${EVENTS_URL}/${eventId}`).then((result) => {
      const feedbackList = result.data.feedback;
      feedbackList.push(feedback);
      handleSendFeedback(feedbackList);
    });

    closeFeedbackDialog();
  };

  const handleSendFeedback = (feedbackList) => {
    axios.patch(
      `${EVENTS_URL}/${props.eventId}`,
      { feedback: feedbackList },
      { headers: { "Content-Type": "application/json" } }
    );
  };

  return (
    <Dialog maxWidth="xs" fullWidth={true} open={props.isOpen}>
      <DialogTitle className={classes.title}>{eventName}</DialogTitle>
      <DialogContent>
        <Grid container justify="space-evenly" className={classes.logos}>
          <Logo2 />
          <Logo />
          <Logo3 />
          <Logo4 />
          <Logo5 />
        </Grid>

        <Category
          value={clarity}
          handleChange={(event) => setClarity(event.target.value)}
          category={"Clarity of fullPage/Content"}
        />
        <Category
          value={originality}
          handleChange={(event) => setOriginality(event.target.value)}
          category={"Originality of the presentation"}
        />
        <Category
          value={complexity}
          handleChange={(event) => setComplexity(event.target.value)}
          category={"Complexity of the subject"}
        />
        <Category
          value={engagement}
          handleChange={(event) => setEngagement(event.target.value)}
          category={"Engagement with the audience"}
        />
        <Category
          value={cursive}
          handleChange={(event) => setCursive(event.target.value)}
          category={"Cursive flow, good pace"}
        />

        <Grid container justify="space-evenly" style={{ marginTop: "150px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleClickCancel}
            style={styles.button}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSend}
            style={styles.button}
          >
            Send
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(Feedback);
