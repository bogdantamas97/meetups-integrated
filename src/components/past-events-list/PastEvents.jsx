import React from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import {
  withStyles,
  CircularProgress,
  ListItem,
  List,
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import PastEventItem from "./PastEventItem.jsx";
import Cookies from "universal-cookie";
import moment from "moment";
import { eventType } from "../../constants/index";
import { EventsMessage, CloseMessageButton } from "../EventsMessage.jsx";
import Feedback from "../feedback/Feedback.jsx";

const styles = {
  root: {
    width: "100%",
    height: "100%",
  },
  header: {
    display: "block",
    height: "30%",
    width: "100%",
  },
  list: {
    height: "98%",
    width: "100%",
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

class PastEvents extends React.Component {
  state = {
    isOpen: false,
    userId: 0,
    eventId: null,
    eventName: "",
    isLoaded: false,
    events: [],
    buttonList: [],
    noPastEventsWithoutFeedback: 0,
    isMessageVisible: true,
    cookies: new Cookies(), //.set("token", "usrABC13") TODO remove later
  };

  constructor(props) {
    super(props);
    this.findButtonStateById = this.findButtonStateById.bind(this);
  }

  componentDidMount() {
    const isMessageVisible = !this.state.cookies.get("pastEventsMessageClosed");
    axios.get("http://localhost:3001/events?_expand=users").then((res) => {
      const event = res.data;
      const buttonList = [];
      const events = [];
      let noFeedback = 0;
      event.forEach((item) => {
        if (item.timestamp < moment().unix()) {
          buttonList.push({
            key: item.id,
            userId: item.userId,
            value: false,
          });
          noFeedback += 1;
          events.push(item);
        }
      });

      events.forEach((item, i) => {
        item.feedback.forEach((feedbackItem) => {
          if (feedbackItem.userId === this.state.cookies.get("token")) {
            buttonList[i].value = true;
            noFeedback -= 1; //TODO could lead to errors if the db is worng, or return duplicate
          }
        });
      });
      this.setState({
        userId: this.state.cookies.get("token"),
        buttonList: buttonList,
        events: events,
        isLoaded: true,
        isMessageVisible: isMessageVisible,
        noPastEventsWithoutFeedback: noFeedback,
      });
    });
  }

  handleOnClickInfoMessage = () => {
    this.state.cookies.set("pastEventsMessageClosed", true, { path: "/" });
    this.setState({
      isMessageVisible: false,
    });
  };

  findButtonStateById(itemId) {
    for (let item of this.state.buttonList) {
      if (item.key === itemId) {
        return item.value;
      }
    }
    return undefined;
  }

  changeButtonStateById = (id, val) => {
    let buttonListCopy = [...this.state.buttonList];
    for (let item of buttonListCopy) {
      if (item.key === id) {
        item.value = val;
      }
    }
    this.setState({ buttonList: buttonListCopy });
  };

  closeFeedbackDialog = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleClickDialogCancel = (eventId) => {
    this.changeButtonStateById(eventId, false);

    let noFeedback = this.state.noPastEventsWithoutFeedback; //TODO Move logic to change button state by Id
    noFeedback += 1;

    this.setState({
      isOpen: false,
      noPastEventsWithoutFeedback: noFeedback,
    });
  };

  handleFeedbackClick = (ui, ei, en) => {
    let buttonListCopy = [...this.state.buttonList];

    //TODO Replace logic here
    this.state.events.forEach((item, i) => {
      item.feedback.forEach((feedbackItem) => {
        if (feedbackItem.userId === this.state.userId) {
          buttonListCopy[i].value = true;
        }
      });
    });

    let noFeedback = this.state.noPastEventsWithoutFeedback;
    noFeedback -= 1;

    this.setState({
      isOpen: true,
      userId: ui,
      eventId: ei,
      eventName: en,
      buttonList: buttonListCopy,
      noPastEventsWithoutFeedback: noFeedback,
    });
  };

  render() {
    const { classes } = this.props;

    const styleHeader = this.state.isMessageVisible
      ? { display: "block", height: "15%", width: "100%", maxHeight: 90 }
      : { display: "none", height: "10%", width: "100%" };

    const styleContent = this.state.isMessageVisible
      ? { height: "85%", width: "100%" }
      : { height: "100%", width: "100%" };

    return (
      <MainLayout topBarTitle={"Past Events"}>
        <div className={classes.root}>
          {!this.state.cookies.get("pastEventsMessageClosed") && (
            <div style={styleHeader}>
              <EventsMessage
                eventTypeMessage={eventType.pastEvents}
                numberOfPastEventsWithoutFeedback={
                  this.state.noPastEventsWithoutFeedback
                }
              >
                <CloseMessageButton onClick={this.handleOnClickInfoMessage} />
              </EventsMessage>
            </div>
          )}
          <div style={styleContent}>
            <List className={classes.list}>
              {this.state.isLoaded &&
                this.state.events.map((item) => {
                  let buttonState = this.findButtonStateById(item.id);
                  let feedbackText = "";
                  if (buttonState) {
                    feedbackText = "Thank you!";
                  } else {
                    feedbackText = "Feedback";
                  }
                  return (
                    <ListItem key={item.id} className={classes.listItem}>
                      <PastEventItem
                        usreId={this.state.userId}
                        itemId={item.id}
                        lang={item.lang}
                        name={item.name}
                        feedbackText={feedbackText}
                        isDisabled={buttonState}
                        changeButtonStateById={this.changeButtonStateById}
                        feedbackList={item.feedback}
                        handleFeedbackClick={() =>
                          this.handleFeedbackClick(
                            this.state.userId,
                            item.id,
                            item.name
                          )
                        }
                        date={moment.unix(item.timestamp).format(`DD MMM 'YY`)}
                        time={moment.unix(item.timestamp).format(`hh:mm`)}
                        secondLine={`${item.type} (${item.difficulty}) ~ ${item.duration}`}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </div>
        </div>
        <Feedback
          isOpen={this.state.isOpen}
          userId={this.state.userId}
          eventId={this.state.eventId}
          eventName={this.state.eventName}
          closeFeedbackDialog={this.closeFeedbackDialog}
          handleIsDisabled={this.handleIsDisabled}
          handleClickCancel={() =>
            this.handleClickDialogCancel(this.state.eventId)
          }
        />
      </MainLayout>
    );
  }
}

PastEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PastEvents);
