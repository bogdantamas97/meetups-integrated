import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment/moment";
import {
  withStyles,
  ListItem,
  List,
  Paper,
  Typography,
} from "@material-ui/core";

import { theme } from "../../styles/globalTheme";
import { myEventsStyles } from "../../styles";
import { MainLayout } from "../../layouts/index";
import { EventsMessage } from "../index";
import FutureEventItem from "../futureEvents/FutureEventItem.jsx";
import EventDialog from "../futureEvents/EventDialog.jsx";
import { EVENTS_URL, EVENT_TYPE, CURRENT_USER_ID } from "../../constants";

class MyEvents extends React.Component {
  state = {
    list: [],
    event: [],
    dialogType: "",
    isLoaded: false,
    isOpen: false,
    isLoading: false,
    isDisplayed: true,
  };

  isUsersEvent = (event) =>
    event.attendanceIds.includes(CURRENT_USER_ID) ||
    event.waitingListIds.includes(CURRENT_USER_ID);

  componentDidMount() {
    axios(`${EVENTS_URL}?_expand=users`).then((result) => {
      this.setState({
        event: result.data.filter(this.isUsersEvent),
        isLoaded: true,
      });
    });
  }

  handleOnClick = () => {
    this.setState({ isDisplayed: false });
  };

  checkUser = (item) => {
    const { userId, attendanceIds, waitingListIds } = item;
    if (waitingListIds.includes(CURRENT_USER_ID)) {
      return "You are in the waiting list";
    }

    if (userId === CURRENT_USER_ID) {
      return "You are the speaker";
    }
    if (attendanceIds.includes(CURRENT_USER_ID)) {
      return "Unsubscribe";
    }
  };

  handleOpenUnsubscribeDialog = (eventId) => {
    axios(`${EVENTS_URL}/${eventId}`)
      .then((result) => {
        const list = result.data.attendanceIds.filter(
          (item) => item !== CURRENT_USER_ID
        );
        this.setState({ list });
      })
      .then(() => {
        axios.patch(
          `${EVENTS_URL}/${eventId}`,
          { attendanceIds: this.state.list },
          { headers: { "Content-Type": "application/json" } }
        );
        this.setState({ isLoading: true });
      })
      .then(() => {
        if (this.state.isLoading) {
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
      this.setState({ event: result.data.filter(this.isUsersEvent) });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <MainLayout topBarTitle={"My Events"}>
        <div className={classes.root}>
          <div className={classes.styleHeader}>
            <EventsMessage eventTypeMessage={EVENT_TYPE.MY_EVENTS} />
          </div>
          <div className={classes.styleContent}>
            <List className={classes.list}>
              {this.state.isLoaded ? (
                !this.state.event.length ? (
                  <Paper className={classes.paperStyle}>
                    <Typography style={theme.typography.headline}>
                      You haven't subscribed to any event.
                    </Typography>
                  </Paper>
                ) : (
                  this.state.event
                    .filter((item) => item.timestamp > moment().unix())
                    .map((item) => (
                      <ListItem key={item.id} className={classes.listItem}>
                        <FutureEventItem
                          lang={item.lang}
                          name={item.name}
                          date={moment
                            .unix(item.timestamp)
                            .format(`DD MMM 'YY`)}
                          time={moment.unix(item.timestamp).format(`hh:mm`)}
                          secondLine={`${item.type} (${item.difficulty}) ~ ${item.duration}`}
                          action={this.checkUser(item)}
                          handleUnsubscribeClick={() =>
                            this.handleOpenUnsubscribeDialog(item.id)
                          }
                        />
                      </ListItem>
                    ))
                )
              ) : (
                undefined
              )}
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

MyEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(myEventsStyles)(MyEvents);
