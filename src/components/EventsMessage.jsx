import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  Message: {
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  icons: {
    fontSize: 10,
    float: "right",
    backgroundColor: "lightgray",
    width: "4vw",
    height: "4vw",
    maxWidth: 25,
    maxHeight: 25,
    borderRadius: 90,
  },
};

export const EventsMessage = (props) => {
  const [eventType, setEventTypeMessage] = useState(props.eventTypeMessage);
  const [
    numberOfPastEventsWithoutFeedback,
    setMumberOfPastEventsWithoutFeedback,
  ] = useState(props.numberOfPastEventsWithoutFeedback);

  useEffect(() => {
    setMumberOfPastEventsWithoutFeedback(
      props.numberOfPastEventsWithoutFeedback
    );
  }, []);

  return (
    <Grid>
      <Grid style={styles.Message}>
        <ListItem>
          <div style={{ width: "90%" }}>
            {(() => {
              switch (eventType.toString()) {
                case "future events":
                  return (
                    <Typography style={{ fontSize: 12 }}>
                      This is a list of all future events. You can choose to
                      unsubscribe. Please do this as soon as you know that you
                      won't be able to participate, so we can notify the people
                      in the waiting list.
                    </Typography>
                  );
                case "my events":
                  return (
                    <Typography style={{ fontSize: 12 }}>
                      This is a list of all future events to which you've
                      subscribed. You can choose to unsubscribe. Please do this
                      as soon as you know that you won't be able to participate,
                      so we can notify the people in the waiting list!
                    </Typography>
                  );
                case "past events":
                  return (
                    <Typography style={{ fontSize: 12 }}>
                      This is a list of all the past events where you
                      participated. Please don't forget to leave a quick
                      Feedback and you will be rewarded! There are{" "}
                      <b style={{ fontSize: 14 }}>
                        {numberOfPastEventsWithoutFeedback}
                      </b>{" "}
                      more events that require your feedback.
                    </Typography>
                  );
                case "vote topics":
                  return (
                    <Typography style={{ fontSize: 12 }}>
                      Vote UP the topics you find interesting and you would love
                      to see a presentation about them. Vote Down the topics
                      that you've seen them presented already or if you find
                      them dull.
                    </Typography>
                  );
                default:
                  return (
                    <Typography style={{ fontSize: 12 }}>
                      Default message.
                    </Typography>
                  );
              }
            })()}
          </div>
          <div
            style={{
              width: "10%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {props.children}
          </div>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export const CloseMessageButton = (props) => (
  <IconButton
    key="close"
    aria-label="Close"
    color="inherit"
    onClick={props.onClick}
  >
    <CloseIcon style={styles.icons} />
  </IconButton>
);
