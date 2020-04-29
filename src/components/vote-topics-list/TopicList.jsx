import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import {
  Button,
  Typography,
  withStyles,
  ListItem,
  List,
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import TopicItem from "./TopicItem.jsx";
import Cookies from "universal-cookie";
import { eventType } from "../../constants/index";
import { EventsMessage, CloseMessageButton } from "../EventsMessage.jsx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { button, footerBar, theme } from "../../GlobalTheme/globalTheme.js";
import TopicDialog from "./TopicDialog.jsx";

const styles = {
  typography: theme.typography,
  button: button,
  footerBar: footerBar,
  root: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  header: {
    display: "block",
    height: "30%",
    width: "100%",
    backgroundColor: "white",
  },
  list: {
    height: "98%",
    width: "100%",
    overflow: "scroll",
  },
  listItem: {
    width: "100%",
    height: 73,
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
};
const cookies = new Cookies();

const TopicList = (props) => {
  const [isMessageVisible, changeMessageDisplay] = useState(
    cookies.get("voteTopicsMessageClosed")
  );
  const [open, setOpen] = useState(false);
  const [event, changeEvent] = useState([{}]);
  const [isLoaded, changeLoad] = useState(false);
  const forceUpdate = React.useCallback((result) => changeEvent(result), []);

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

  const handleClose = (string) => {
    if (string === "sent") {
      const result = axios("http://localhost:3001/proposedTopics");
      forceUpdate(result.data);
      changeLoad(true);
    }
    setOpen(false);
  };

  return (
    <MainLayout topBarTitle={"Vote Topics"}>
      {!cookies.get("voteTopicsMessageClosed") && (
        <div style={styleHeader}>
          <EventsMessage eventTypeMessage={eventType.voteTopics}>
            <CloseMessageButton onClick={handleOnClick} />
          </EventsMessage>
        </div>
      )}
      <TopicDialog open={open} handleClose={handleClose} />
      <div style={styleContent}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          <Typography
            style={{
              color: theme.palette.primary.contrastText,
              fontSize: theme.typography.subheading.fontSize,
            }}
          >
            {" "}
            Propose a topic!
          </Typography>
        </Button>
        <List className={classes.list}>
          {isLoaded && event
            ? event
                .sort((a, b) => a.sumOfVotes - b.sumOfVotes)
                .reverse()
                .map((item) => (
                  <ListItem key={item.sumOfVotes} className={classes.listItem}>
                    <TopicItem
                      userId={new Cookies().get("token")}
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
    </MainLayout>
  );
};

TopicList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicList);
