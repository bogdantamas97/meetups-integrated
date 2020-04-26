import Header from "./Header";
import React, { Component } from "react";
import MainLayout from "../../layouts/MainLayout";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, Slide, Snackbar } from "@material-ui/core";
import ListComponent from "../leaderboard/ListComponent";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { theme } from "../../GlobalTheme/globalTheme";
import { Paper } from "@material-ui/core";

const styles = theme => ({
  typography: theme.typography.body1,
  root: {
    flexGrow: 1
  },
  List: {
    marginTop: "30px",
    width: "100%",
    height: "40%",
    overflow: "scroll"
  },
  loadmore: {
    width: "100%",
    height: "20%",
    marginTop: 40
  },
  button: {
    textTransform: "none",
    marginLeft: "40%"
  }
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class Profile extends Component {
  state = {
    content: [],
    nrElementsToShow: 5,
    isLoaded: false,
    open: false,
    Transition: null
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/pointsReceived`).then(result => {
      const content = result.data.filter(item => {
        return item.userId === this.props.userId;
      });

      const isLoaded = true;
      this.setState({ content, isLoaded });
    });
  }

  updateNrElementsToShow = () => {
    const nrElementsToShow = this.state.nrElementsToShow + 5;
    this.setState({ nrElementsToShow });
  };

  pagination = () => {
    if (this.state.content[0] !== undefined) {
      return this.state.content[0].points
        .filter(item => {
          return (
            this.state.content[0].points.indexOf(item) <
            this.state.nrElementsToShow
          );
        })
        .map(item => (
          <ListItem key={item.id}>
            <ListComponent
              name={`+${item.value} ${item.type}`}
              points={item.date}
            />
          </ListItem>
        ));
    } else {
      return (
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
            textAlign: "center"
          }}
        >
          <Typography style={theme.typography.title}>
            You have no recent history.
          </Typography>
        </Paper>
      );
    }
  };

  handleClickLoadMore = Transition => () => {
    this.setState({ open: true, Transition });
    this.updateNrElementsToShow();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <MainLayout topBarTitle="My Profile">
        <div className={classes.root}>
          <Header userId={this.props.userId} />
          {this.state.isLoaded ? (
            <List className={classes.List}>{this.pagination()}</List>
          ) : (
            "loading"
          )}
          <div className={classes.loadmore}>
            <Button className={classes.button}>
              <Typography
                className={classes.typography}
                onClick={this.handleClickLoadMore(TransitionUp)}
              >
                Load more
              </Typography>
            </Button>
          </div>
          <Snackbar
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">List was refreshed</span>}
          />
        </div>
      </MainLayout>
    );
  }
}

export default withStyles(styles)(Profile);
