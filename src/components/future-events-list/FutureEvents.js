import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { withStyles, ListItem, List } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import FutureEventItem from "./FutureEventItem";
import Cookies from "universal-cookie";
import { EventsMessage, CloseMessageButton } from "../EventsMessage";
import { eventType } from "../Enumerations";
import moment from "moment";
import EventDialog from "./EventDialog";

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

class FutureEvents extends React.Component {
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
    userId: 0
  };

  componentDidMount() {
    let isMessageVisible = !this.state.cookies.get("futureEventsMessageClosed");
    let userId = parseInt(new Cookies().get("token").substring(6));
    axios("http://localhost:3001/events?_expand=users").then(result => {
      this.setState({
        userId,
        isMessageVisible,
        event: result.data,
        isLoaded: true
      });
    });
  }

  handleOnClick = () => {
    this.setState({ isDisplayed: false });
    this.state.cookies.set("futureEventsMessageClosed", true, { path: "/" });
  };

  checkUser = item => {
    if (item.waitingListIds.includes(this.state.userId)) {
      return "You are in the waiting list";
    }

    if (item.attendanceIds.length >= item.maxPeople) {
      return "Waiting List";
    }

    if (item.usersId === this.state.userId) {
      return "You are the speaker";
    }
    if (!item.attendanceIds.includes(this.state.userId)) {
      return "Subscribe";
    } else {
      return "Unsubscribe";
    }
  };

  handleOpenWaitingDialog = eventId => {
    axios(`http://localhost:3001/events/${eventId}`)
      .then(result => {
        let list = result.data.waitingListIds;
        list.push(this.state.userId);
        this.setState({ list });
      })
      .then(() => {
        axios.patch(
          `http://localhost:3001/events/${eventId}`,
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
      .catch(error => {
        this.setState({ isOpen: true, dialogType: "error" });
      });
  };

  handleOpenSubscribeDialog = eventId => {
    axios(`http://localhost:3001/events/${eventId}`)
      .then(result => {
        let list = result.data.attendanceIds;
        list.push(this.state.userId);
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
            dialogType: "subscribe"
          });
        }
      })
      .catch(error => {
        this.setState({ isOpen: true, dialogType: "error" });
      });
  };

  handleOpenUnsubscribeDialog = eventId => {
    axios(`http://localhost:3001/events/${eventId}`)
      .then(result => {
        let list = result.data.attendanceIds;
        list.splice(list.indexOf(this.state.userId), 1);
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
            dialogType: "unsubscribe"
          });
        }
      })
      .catch(error => {
        this.setState({ isOpen: true, dialogType: "error" });
      });
  };

  handleCloseDialog = () => {
    this.setState({ isOpen: false });
    axios("http://localhost:3001/events?_expand=users").then(result => {
      this.setState({ event: result.data });
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
      <MainLayout topBarTitle={"Future Events"}>
        <div className={classes.root}>
          {!this.state.cookies.get("futureEventsMessageClosed") && (
            <div style={styleHeader}>
              <EventsMessage eventTypeMessage={eventType.futureEvents}>
                <CloseMessageButton onClick={this.handleOnClick} />
              </EventsMessage>
            </div>
          )}
          <div style={styleContent}>
            <List className={classes.list}>
              {this.state.isLoaded
                ? this.state.event
                    .filter(item => item.timestamp > moment().unix())
                    .map(item => (
                      <ListItem key={item.id} className={classes.listItem}>
                        <FutureEventItem
                          lang={item.lang}
                          name={item.name}
                          date={moment
                            .unix(item.timestamp)
                            .format(`DD MMM 'YY`)}
                          time={moment.unix(item.timestamp).format(`hh:mm`)}
                          secondLine={`${item.type} - ${item.users.fullName} (${
                            item.difficulty
                          }) ~ ${item.duration}`}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FutureEvents);
