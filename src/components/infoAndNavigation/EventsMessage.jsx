import React from "react";
import { Grid, ListItem, Typography } from "@material-ui/core";

const styles = {
  Message: {
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  eventBox: { width: "90%" },
  eventMessage: { fontSize: 12 },
};

const EventsMessage = (props) => {
  const { eventTypeMessage, numberOfPastEventsWithoutFeedback } = props;

  return (
    <Grid>
      <Grid style={styles.Message}>
        <ListItem>
          <div style={styles.eventBox}>
            {(() => {
              switch (eventTypeMessage.toString()) {
                case "future events":
                  return (
                    <Typography style={styles.eventsMessage}>
                      This is a list of all future events. You can choose to
                      unsubscribe. Please do this as soon as you know that you
                      won't be able to participate, so we can notify the people
                      in the waiting list.
                    </Typography>
                  );
                case "my events":
                  return (
                    <Typography style={styles.eventsMessage}>
                      This is a list of all future events to which you've
                      subscribed. You can choose to unsubscribe. Please do this
                      as soon as you know that you won't be able to participate,
                      so we can notify the people in the waiting list!
                    </Typography>
                  );
                case "past events":
                  return (
                    <Typography style={styles.eventsMessage}>
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
                    <Typography style={styles.eventsMessage}>
                      Vote UP the topics you find interesting and you would love
                      to see a presentation about them. Vote Down the topics
                      that you've seen them presented already or if you find
                      them dull.
                    </Typography>
                  );
                default:
                  return (
                    <Typography style={styles.eventsMessage}>
                      Default message.
                    </Typography>
                  );
              }
            })()}
          </div>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default EventsMessage;
