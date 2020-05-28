import React from "react";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment/moment";
import { theme } from "../GlobalTheme/globalTheme";
import MainLayout from "../layouts/MainLayout.jsx";
import {
  withStyles,
  ListItem,
  List,
  Paper,
  Typography,
} from "@material-ui/core";
import FutureEventItem from "./future-events-list/FutureEventItem.jsx";
import { EventsMessage } from "./index";
import EventDialog from "./future-events-list/EventDialog.jsx";
import { EVENTS_URL, eventType } from "../constants/index";

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
  styleHeader: {
    display: "block",
    height: "15%",
    width: "100%",
    maxHeight: 90,
  },
  styleContent: { height: "85%", width: "100%" },
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

class MyEvents extends React.Component {
  state = {
    isDisplayed: true,
    event: [],
    isLoaded: false,
    isOpen: false,
    dialogType: "",
    cookies: new Cookies(),
    list: [],
    isLoading: true,
  };

  isUsersEvent = (event) => {
    const id = this.state.cookies.get("token");
    return (
      event.attendanceIds.includes(id) || event.waitingListIds.includes(id)
    );
  };

  componentDidMount() {
    const userId = this.state.cookies.get("token");

    axios(`${EVENTS_URL}?_expand=users`).then((result) => {
      this.setState({
        userId,
        event: result.data.filter(this.isUsersEvent),
        isLoaded: true,
      });
    });
  }

  handleOnClick = () => {
    this.setState({ isDisplayed: false });
  };

  checkUser = (item) => {
    if (item.waitingListIds.includes(this.state.userId)) {
      return "You are in the waiting list";
    }

    if (item.userId === this.state.userId) {
      return "You are the speaker";
    }
    if (item.attendanceIds.includes(this.state.userId)) {
      return "Unsubscribe";
    }
  };

  handleOpenUnsubscribeDialog = (eventId) => {
    axios(`${EVENTS_URL}/${eventId}`)
      .then((result) => {
        const list = result.data.attendanceIds.filter(
          (item) => item !== this.state.userId
        );
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
      this.setState({ event: result.data.filter(this.isUsersEvent) });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <MainLayout topBarTitle={"My Events"}>
        <div className={classes.root}>
          <div className={classes.styleHeader}>
            <EventsMessage eventTypeMessage={eventType.myEvents} />
          </div>
          <div className={classes.styleContent}>
            <List className={classes.list}>
              {this.state.isLoaded ? (
                !this.state.event.length ? (
                  <Paper
                    style={{
                      display: "flex",
                      marginTop: "10%",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "80%",
                      height: "30%",
                      marginLeft: "10%",
                      textAlign: "center",
                      borderRadius: 30,
                      padding: 4,
                    }}
                  >
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
              ) : undefined}
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

export default withStyles(styles)(MyEvents);
