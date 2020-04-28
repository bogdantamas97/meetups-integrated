import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import { withStyles, ListItem, List, Typography } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import FutureEventItem from "./FutureEventItem.jsx";
import Cookies from "universal-cookie";
import { theme } from "../../GlobalTheme/globalTheme";
import Paper from "@material-ui/core/Paper";
import { eventType } from "../constants/index";
import { EventsMessage, CloseMessageButton } from "../EventsMessage.jsx";

const styles = {
  root: {
    width: "100%",
    height: "100%"
  },
  header: {
    display: "block",
    height: "30%",
    width: "100%"
  },
  list: {
    height: "98%",
    width: "100%",
    overflow: "scroll"
  },
  listItem: {
    width: "100%",
    height: 73,
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px"
  }
};
const cookies = new Cookies();
const MyEvents = props => {
  const [isMessageVisible, changeMessageDisplay] = useState(
    !cookies.get("myEventsMessageClosed")
  );
  const [event, changeEvent] = useState([{}]);
  const [isLoaded, changeLoad] = useState(false);
  const { classes } = props;

  const isUsersEvent = event => {
    return event.attendanceIds.includes(
      parseInt(new Cookies().get("token").substring(6))
    );
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:3001/events?_expand=users");
      changeEvent(result.data.filter(isUsersEvent));
      changeLoad(true);
    }
    fetchData();
  }, []);

  const styleHeader = isMessageVisible
    ? { display: "block", height: "15%", width: "100%", maxHeight: 90 }
    : { display: "none", height: "10%", width: "100%" };

  const styleContent = isMessageVisible
    ? { height: "85%", width: "100%" }
    : { height: "100%", width: "100%" };

  const handleOnClick = () => {
    cookies.set("myEventsMessageClosed", true, { path: "/" });
    changeMessageDisplay(false);
  };

  const checkUser = item => {
    if (item.usersId === parseInt(new Cookies().get("token").substring(6))) {
      return "You are the speaker";
    } else {
      return "You have subscribed to this event";
    }
  };

  return (
    <MainLayout topBarTitle={"My Events"}>
      <div className={classes.root}>
        {!cookies.get("myEventsMessageClosed") && (
          <div style={styleHeader}>
            <EventsMessage eventTypeMessage={eventType.myEvents}>
              <CloseMessageButton onClick={handleOnClick} />
            </EventsMessage>
          </div>
        )}
        <div style={styleContent}>
          <List className={classes.list}>
            {isLoaded ? (
              !event.length ? (
                <Paper
                  style={{
                    display: "flex",
                    marginTop: "10%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "columns",
                    width: "80%",
                    height: "30%",
                    marginLeft: "10%",
                    textAlign: "center"
                  }}
                >
                  <Typography style={theme.typography.headline}>
                    You haven't subscribed to any event.
                  </Typography>
                </Paper>
              ) : (
                event.map(item => (
                  <ListItem key={item.id} className={classes.listItem}>
                    <FutureEventItem
                      lang={item.lang}
                      name={item.name}
                      date={item.date}
                      time={item.time}
                      secondLine={`${item.type} - ${item.users.fullName} (${
                        item.difficulty
                      }) ~ ${item.duration}`}
                      action={checkUser(item)}
                    />
                  </ListItem>
                ))
              )
            ) : (
              undefined
            )}
          </List>
        </div>
      </div>
    </MainLayout>
  );
};

MyEvents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyEvents);
