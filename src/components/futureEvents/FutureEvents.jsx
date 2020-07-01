import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import { withStyles, ListItem, List } from "@material-ui/core";

import FutureEventItem from "./FutureEventItem.jsx";
import { futureEventsStyles } from "../../styles";
import { getTimeFromStamp } from '../../helpers';
import EventDialog from "./EventDialog";
import {
  MAX_ATTENDANTS_ON_EVENT,
  EVENTS_URL,
  EVENT_TYPE,
} from "../../constants";
import { MainLayout } from "../../layouts";
import { EventsMessage } from "..";

const CURRENT_USER_ID = new Cookies().get("token");

class FutureEvents extends Component {
  state = {
    list: [],
    event: [],
    dialogType: "",
    isLoaded: false,
    isOpen: false,
    isLoading: true,
  };

  componentDidMount() {
    axios(`${EVENTS_URL}?_expand=users`).then((result) => {
      this.setState({
        CURRENT_USER_ID,
        event: result.data,
        isLoaded: true,
      });
    });
  }

  checkUser = (item) => {
    const { waitingListIds, userId, attendanceIds } = item;
    if (waitingListIds.includes(CURRENT_USER_ID)) {
      return "You are in the waiting list";
    }

    if (attendanceIds.length >= MAX_ATTENDANTS_ON_EVENT) {
      return "Waiting List";
    }

    if (userId === CURRENT_USER_ID) {
      return "You are the speaker";
    }
    if (!attendanceIds.includes(CURRENT_USER_ID)) {
      return "Subscribe";
    } else {
      return "Unsubscribe";
    }
  };

  handleOpenWaitingDialog = (eventId) => {
    axios(`${EVENTS_URL}/${eventId}`)
      .then((result) => {
        const list = result.data.waitingListIds;
        list.push(CURRENT_USER_ID);
        this.setState({ list });
      })
      .then(() => {
        axios.patch(
          `${EVENTS_URL}/${eventId}`,
          { waitingListIds: this.state.list },
          { headers: { "Content-Type": "application/json" } }
        );
        this.setState({ isLoading: false });
      })
      .then(() => {
        if (!this.state.isLoading) {
          this.setState({ isOpen: true, dialogType: "waitinglist" });
        }
      })
      .catch((error) => {
        this.setState({ isOpen: true, dialogType: "error" });
      });
  };

  handleOpenSubscribeDialog = (eventId) => {
    axios(`${EVENTS_URL}/${eventId}`)
      .then((result) => {
        const list = result.data.attendanceIds;
        list.push(CURRENT_USER_ID);
        this.setState({ list });
      })
      .then(() => {
        axios.patch(
          `${EVENTS_URL}/${eventId}`,
          { attendanceIds: this.state.list },
          { headers: { "Content-Type": "application/json" } }
        );
        this.setState({ isLoading: false });
      })
      .then(() => {
        if (!this.state.isLoading) {
          this.setState({
            isOpen: true,
            dialogType: "subscribe",
          });
        }
      })
      .catch((error) => {
        this.setState({ isOpen: true, dialogType: "error" });
      });
  };

  handleOpenUnsubscribeDialog = (eventId) => {
    axios(`${EVENTS_URL}/${eventId}`)
      .then((result) => {
        let list = result.data.attendanceIds;
        list.splice(list.indexOf(CURRENT_USER_ID), 1);
        this.setState({ list });
      })
      .then(() => {
        axios.patch(
          `${EVENTS_URL}/${eventId}`,
          { attendanceIds: this.state.list },
          { headers: { "Content-Type": "application/json" } }
        );
        this.setState({ isLoading: false });
      })
      .then(() => {
        if (!this.state.isLoading) {
          this.setState({
            isOpen: true,
            dialogType: "unsubscribe",
          });
        }
      })
      .catch((error) => {
        this.setState({ isOpen: true, dialogType: "error" });
      });
  };

  handleCloseDialog = () => {
    this.setState({ isOpen: false });
    axios(`${EVENTS_URL}?_expand=users`).then((result) => {
      this.setState({ event: result.data });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <MainLayout topBarTitle={"Future Events"}>
        <div className={classes.root}>
          <div className={classes.styleHeader}>
            <EventsMessage eventTypeMessage={EVENT_TYPE.FUTURE_EVENTS} />
          </div>
          <div className={classes.styleContent}>
            <List className={classes.list}>
              {this.state.isLoaded
                ? this.state.event
                    .filter((item) => item.timestamp > moment().unix())
                    .map((item) => (
                      <ListItem key={item.id} className={classes.listItem}>
                        <FutureEventItem
                          lang={item.lang}
                          name={item.name}
                          date={moment
                            .unix(item.timestamp)
                            .format(`DD MMM 'YY`)}
                          time={getTimeFromStamp(item.timestamp)}
                          secondLine={`${item.type} (${item.difficulty}) ~ ${item.duration}`}
                          action={this.checkUser(item)}
                          handleWaitingListClick={() =>
                            this.handleOpenWaitingDialog(item.id)
                          }
                          handleSubscribeClick={() =>
                            this.handleOpenSubscribeDialog(item.id)
                          }
                          handleUnsubscribeClick={() =>
                            this.handleOpenUnsubscribeDialog(item.id)
                          }
                        />
                      </ListItem>
                    ))
                : undefined}
            </List>
          </div>
          {this.state.isOpen && (
            <EventDialog
              isOpen={this.state.isOpen}
              dialogType={this.state.dialogType}
              handleClose={this.handleCloseDialog}
            />
          )}
        </div>
      </MainLayout>
    );
  }
}

FutureEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(futureEventsStyles)(FutureEvents);
