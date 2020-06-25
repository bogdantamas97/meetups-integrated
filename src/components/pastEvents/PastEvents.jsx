import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import moment from "moment";
import { withStyles, ListItem, List } from "@material-ui/core";

import PastEventItem from "./PastEventItem.jsx";
import { MainLayout } from "../../layouts";
import { getTimeFromStamp } from "../../helpers";
import { EVENTS_URL, EVENT_TYPE } from "../../constants";
import { EventsMessage, Feedback } from "../";
import { pastEventsStyles } from "../../styles";

const CURRENT_USER_ID = new Cookies().get("token");

class PastEvents extends Component {
  constructor(props) {
    super(props);
    this.findButtonStateById = this.findButtonStateById.bind(this);
  }

  state = {
    isOpen: false,
    eventId: 0,
    eventName: "",
    isLoaded: false,
    events: [],
    buttonList: [],
    noPastEventsWithoutFeedback: 0,
  };

  componentDidMount() {
    axios.get(`${EVENTS_URL}?_expand=users`).then((res) => {
      let noFeedback = 0;
      const event = res.data;
      const buttonList = [];
      const events = [];
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
          if (feedbackItem.userId === CURRENT_USER_ID) {
            buttonList[i].value = true;
            noFeedback -= 1; //TODO could lead to errors if the db is worng, or return duplicate
          }
        });
      });
      this.setState({
        buttonList: buttonList,
        events: events,
        isLoaded: true,
        noPastEventsWithoutFeedback: noFeedback,
      });
    });
  }

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
        if (feedbackItem.userId === CURRENT_USER_ID) {
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

    return (
      <MainLayout topBarTitle={"Past Events"}>
        <div className={classes.root}>
          <div className={classes.styleHeader}>
            <EventsMessage
              eventTypeMessage={EVENT_TYPE.PAST_EVENTS}
              numberOfPastEventsWithoutFeedback={
                this.state.noPastEventsWithoutFeedback
              }
            />
          </div>
          <div className={classes.styleContent}>
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
                        userId={CURRENT_USER_ID}
                        itemId={item.id}
                        lang={item.lang}
                        name={item.name}
                        feedbackText={feedbackText}
                        isDisabled={buttonState}
                        changeButtonStateById={this.changeButtonStateById}
                        feedbackList={item.feedback}
                        handleFeedbackClick={() =>
                          this.handleFeedbackClick(
                            CURRENT_USER_ID,
                            item.id,
                            item.name
                          )
                        }
                        date={moment.unix(item.timestamp).format(`DD MMM 'YY`)}
                        time={getTimeFromStamp(item.timestamp)}
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
          userId={CURRENT_USER_ID}
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

export default withStyles(pastEventsStyles)(PastEvents);
