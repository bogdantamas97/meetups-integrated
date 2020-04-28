import React, { useState, useEffect } from "react";
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

const TopicItem = (props) => {

  const { classes } = props;

  const [topColor, setTopColor] = useState("#484848");
  const [bottomColor, setBottomColor] = useState("#484848");
  const [sumOfVotes, setSumOfVotes] = useState(0);
  const [vote, setVote] = useState(false);
  const [votersList, setVotersList] = useState([])

  const handleTopButton = () => {

    if (topColor === "lightgray" || topColor === "black") {
      setTopColor("#44a6c6");
      setBottomColor("lightgray");
    }

    else{
      setTopColor("lightgray");
      setBottomColor("#44a6c6");
    }

    if (vote !== 1) {
      setVote(1);
    }

    updatePatch(vote);
  };

  const handleBottomButton = () => {
    if (
      bottomColor === "lightgray" ||
      bottomColor === " black"
    )
    {
      setTopColor("lightgray");
      setBottomColor("#44a6c6");
    }
      
    else {
      setTopColor("#44a6c6");
      setBottomColor("lightgray");
    }
    if (vote !== -1) {
      setVote(-1);
    }

    updatePatch(vote);
  };

  // useEffect(() => {
  //   if (
  //     props.userVotes.filter(
  //       item => item.userId === props.userId
  //     )[0] !== undefined
  //   ) {
  //     setState({
  //       vote: props.userVotes.filter(
  //         item => item.userId === props.userId
  //       )[0].vote
  //     });
  //   }
  //   if (props.userVotes.map(item => item.vote).length > 0) {
  //     setState({
  //       sumOfVotes: props.userVotes
  //         .map(item => item.vote)
  //         .reduce((a, b) => a + b)
  //     });
  //   } else setState({ sumOfVotes: 0 });
  // }

  // useEffect(() => {
  //   if (vote === 1) {
  //     setState({
  //       topColor: "#44a6c6",
  //       bottomColor: "lightgray"
  //     });
  //   } else if (vote === -1) {
  //     setState({
  //       topColor: "lightgray",
  //       bottomColor: "#44a6c6"
  //     });
  //   }
  // }

  const updatePatch = (vote) => {
    // const voters = {};
    // voters.userId = props.userId;
    // voters.vote = vote;
    // axios
    //   .get(`http://localhost:3001/proposedTopics/${props.id}`)
    //   .then(result => {
    //     let votersList = result.data.userVotes;
    //     let hasVoted = false;
    //     for (let key in votersList) {
    //       if (votersList[key].userId === voters.userId) {
    //         votersList[key].vote = voters.vote;
    //         hasVoted = true;
    //       }
    //     }
    //     if (hasVoted === false) {
    //       votersList.push(voters);
    //     }
    //     setState({ votersList: votersList });

    //     if (votersList.map(item => item.vote).length > 0) {
    //       setState({
    //         sumOfVotes: votersList
    //           .map(item => item.vote)
    //           .reduce((a, b) => a + b)
    //       });
    //     } else setState({ sumOfVotes: 0 });
    //   })
    //   .then(() => {
    //     axios.patch(
    //       `http://localhost:3001/proposedTopics/${props.id}`,
    //       {
    //         userVotes: votersList,
    //         sumOfVotes: sumOfVotes
    //       },
    //       { headers: { "Content-Type": "application/json" } }
    //     );
    //   });
  }

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
                {sumOfVotes}
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
                    {props.title}
                  </Typography>
                </Grid>
                <Grid item xs className={classes.itemBottom}>
                  <Typography
                  className={classes.itemBottomTypography}>{props.content}</Typography>
                </Grid>
              </Grid>
          </Grid>
          <Grid container direction="column" className={classes.itemThree}>
            <div
              onClick={handleTopButton}
              className={classes.arrowup}
              style={{ borderBottom: "25px solid " + topColor }}
            />
            <div
              onClick={handleBottomButton}
              className={classes.arrowdown}
              style={{ borderTop: "25px solid " + bottomColor }}
            />
          </Grid>
        </Grid>
      </div>
    );
}


export default withStyles(styles)(TopicItem);
