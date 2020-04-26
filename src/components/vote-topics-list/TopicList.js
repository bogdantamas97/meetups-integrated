import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { withStyles, ListItem, List } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import TopicItem from "./TopicItem";
import Cookies from "universal-cookie";
import { eventType } from "../Enumerations";
import { EventsMessage, CloseMessageButton } from "../EventsMessage";

const styles = {
  root: {
    width: "100%",
    height: "100%",
    overflow: "scroll"
  },
  header: {
    display: "block",
    height: "30%",
    width: "100%",
    backgroundColor: "white"
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
const TopicList = props => {
  const [isMessageVisible, changeMessageDisplay] = useState(
    !cookies.get("voteTopicsMessageClosed")
  );
  const [event, changeEvent] = useState([{}]);
  const [isLoaded, changeLoad] = useState(false);
  const userId = parseInt(new Cookies().get("token").substring(6));

  const { classes } = props;

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:3001/proposedTopics");
      changeEvent(result.data);
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
    cookies.set("voteTopicsMessageClosed", true, { path: "/" });
    changeMessageDisplay(false);
  };

  return (
    <MainLayout topBarTitle={"Vote Topics"}>
      <div className={classes.root}>
        {!cookies.get("voteTopicsMessageClosed") && (
          <div style={styleHeader}>
            <EventsMessage eventTypeMessage={eventType.voteTopics}>
              <CloseMessageButton onClick={handleOnClick} />
            </EventsMessage>
          </div>
        )}
        <div style={styleContent}>
          <List className={classes.list}>
            {isLoaded
              ? event
                  .sort((a, b) => a.sumOfVotes - b.sumOfVotes)
                  .reverse()
                  .map(item => (
                    <ListItem
                      key={item.sumOfVotes}
                      className={classes.listItem}
                    >
                      <TopicItem
                        userId={userId}
                        id={item.id}
                        title={item.topicTitle}
                        content={item.topicContent}
                        userVotes={item.userVotes}
                        sumOfVotes={item.sumOfVotes}
                      />
                    </ListItem>
                  ))
              : undefined}
          </List>
        </div>
      </div>
    </MainLayout>
  );
};

TopicList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopicList);
