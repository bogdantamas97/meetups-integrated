import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { withStyles, ListItem, List } from "@material-ui/core";
import axios from "axios/index";
import PropTypes from "prop-types";
import FutureEventItem from "./future-events-list/FutureEventItem.jsx";
import Cookies from "universal-cookie";
import { EventsMessage, CloseMessageButton } from "./EventsMessage.jsx";
import { eventType } from "../constants/index";
import moment from "moment/moment";
import EventDialog from "./future-events-list/EventDialog.jsx";
import Paper from "@material-ui/core/Paper/index";
import Typography from "@material-ui/core/Typography/index";
import { theme } from "../GlobalTheme/globalTheme";

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
    isMessageVisible: true,
  };

  isUsersEvent = (event) => {
    const id = this.state.cookies.get("token");
    return (
      event.attendanceIds.includes(id) || event.waitingListIds.includes(id)
    );
  };

  componentDidMount() {
    const isMessageVisible = !this.state.cookies.get("myEventsMessageClosed");
    const userId = this.state.cookies.get("token");

    axios("http://localhost:3001/events?_expand=users").then((result) => {
      this.setState({
        userId,
        isMessageVisible,
        event: result.data.filter(this.isUsersEvent),
        isLoaded: true,
      });
    });
  }

  handleOnClick = () => {
    this.setState({ isDisplayed: false });
    this.state.cookies.set("myEventsMessageClosed", true, { path: "/" });
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
    axios(`http://localhost:3001/events/${eventId}`)
      .then((result) => {
        const list = result.data.attendanceIds.filter(
          (item) => item !== this.state.userId
        );
        this.setState({ list });
      })
      .then(() => {
        axios.patch(
          `http://localhost:3001/events/${eventId}`,
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
    axios("http://localhost:3001/events?_expand=users").then((result) => {
      this.setState({ event: result.data.filter(this.isUsersEvent) });
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
      <MainLayout topBarTitle={"My Events"}>
        <div className={classes.root}>
          {!this.state.cookies.get("myEventsMessageClosed") && (
            <div style={styleHeader}>
              <EventsMessage eventTypeMessage={eventType.myEvents}>
                <CloseMessageButton onClick={this.handleOnClick} />
              </EventsMessage>
            </div>
          )}
          <div style={styleContent}>
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
