import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

const styles = {
  content: {
    width: "100%",
    height: "100%",
    borderBottom: "1px solid #c0c3c6"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  itemOne: {
    width: 65
  },
  itemThree: {
    width: 105,
    alignItems: "center"
  },
  itemTop: {
    height: "50%",
    overflow: "scroll"
  },
  itemBottom: {
    height: "50%",
    overflow: "scroll"
  },
  itemTopTypography: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    wordBreak: "break-word",
    overflow: "scroll",
    padding: "5px"
  },
  itemBottomTypography: {
    fontSize: 12,
    color: "gray",
    wordBreak: "break-word",
    overflow: "scroll",
    padding: "5px"
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: "5%",
    marginTop: 10
  },
  typography: {
    fontWeight: "bold"
  },
  arrowup: {
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "20px solid",
    paddingBottom: "10px"
  },
  arrowdown: {
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderTop: "20px solid",
    margin: "5px"
  }
};

class TopicItem extends React.Component {
  state = {
    topColor: "#484848",
    bottomColor: "#484848",
    sumOfVotes: 0,
    vote: 0,
    votersList: []
  };

  handleTopButton = event => {
    if (this.state.topColor === "lightgray" || this.state.topColor === "black")
      this.setState({ topColor: "#44a6c6", bottomColor: "lightgray" });
    else this.setState({ topColor: "#44a6c6", bottomColor: "lightgray" });

    if (this.state.vote !== 1) {
      this.setState({
        vote: 1
      });
      this.updatePatch(1);
    }
  };

  handleBottomButton = event => {
    if (
      this.state.bottomColor === "lightgray" ||
      this.state.bottomColor === " black"
    )
      this.setState({ bottomColor: "#44a6c6", topColor: "lightgray" });
    else this.setState({ topColor: "lightgray", bottomColor: "#44a6c6" });
    if (this.state.vote !== -1) {
      this.setState({
        vote: -1
      });
      this.updatePatch(-1);
    }
  };

  componentWillMount() {
    if (
      this.props.userVotes.filter(
        item => item.userId === this.props.userId
      )[0] !== undefined
    ) {
      this.setState({
        vote: this.props.userVotes.filter(
          item => item.userId === this.props.userId
        )[0].vote
      });
    }
    if (this.props.userVotes.map(item => item.vote).length > 0) {
      this.setState({
        sumOfVotes: this.props.userVotes
          .map(item => item.vote)
          .reduce((a, b) => a + b)
      });
    } else this.setState({ sumOfVotes: 0 });
  }

  componentDidMount() {
    if (this.state.vote === 1) {
      this.setState({
        topColor: "#44a6c6",
        bottomColor: "lightgray"
      });
    } else if (this.state.vote === -1) {
      this.setState({
        topColor: "lightgray",
        bottomColor: "#44a6c6"
      });
    }
  }

  updatePatch(vote) {
    const voters = {};
    voters.userId = this.props.userId;
    voters.vote = vote;
    axios
      .get(`http://localhost:3001/proposedTopics/${this.props.id}`)
      .then(result => {
        let votersList = result.data.userVotes;
        let hasVoted = false;
        for (let key in votersList) {
          if (votersList[key].userId === voters.userId) {
            votersList[key].vote = voters.vote;
            hasVoted = true;
          }
        }
        if (hasVoted === false) {
          votersList.push(voters);
        }
        this.setState({ votersList: votersList });

        if (votersList.map(item => item.vote).length > 0) {
          this.setState({
            sumOfVotes: this.state.votersList
              .map(item => item.vote)
              .reduce((a, b) => a + b)
          });
        } else this.setState({ sumOfVotes: 0 });
      })
      .then(() => {
        axios.patch(
          `http://localhost:3001/proposedTopics/${this.props.id}`,
          {
            userVotes: this.state.votersList,
            sumOfVotes: this.state.sumOfVotes
          },
          { headers: { "Content-Type": "application/json" } }
        );
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Grid
          container
          className={classes.container}
          direction="row"
          alignItems="stretch"
        >
          <Grid item className={classes.itemOne}>
            <Avatar className={classes.avatar}>
              <Typography className={classes.typography}>
                {this.state.sumOfVotes}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item style={{ width: "calc(100% - 170px)" , overflow: "scroll"}}>
              <Grid
                container
                className={classes.container}
                direction="column"
                alignItems="stretch"
              >
                <Grid item xs className={classes.itemTop}>
                  <Typography
                    className={classes.itemTopTypography}
                  >
                    {this.props.title}
                  </Typography>
                </Grid>
                <Grid item xs className={classes.itemBottom}>
                  <Typography
                  className={classes.itemBottomTypography}>{this.props.content}</Typography>
                </Grid>
              </Grid>
          </Grid>
          <Grid container direction="column" className={classes.itemThree}>
            <div
              onClick={this.handleTopButton}
              className={classes.arrowup}
              style={{ borderBottom: "25px solid " + this.state.topColor }}
            />
            <div
              onClick={this.handleBottomButton}
              className={classes.arrowdown}
              style={{ borderTop: "25px solid " + this.state.bottomColor }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

TopicItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopicItem);
