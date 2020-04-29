import React, { useState, useEffect } from "react";
import { withStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

const styles = {
  content: {
    width: "90%",
    height: "100%",
    borderBottom: "1px solid #c0c3c6",
    margin: "auto",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  itemOne: {
    width: 65,
  },
  itemThree: {
    width: 105,
    alignItems: "center",
  },
  itemTop: {
    height: "35%",
  },
  itemBottom: {
    height: "65%",
    overflow: "scroll",
    marginBottom: "2px",
    overflowX: "hidden",
  },
  itemTopTypography: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    padding: "5px",
  },
  itemBottomTypography: {
    fontSize: 12,
    color: "gray",
    padding: "5px",
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: "5%",
    marginTop: 10,
  },
  typography: {
    fontWeight: "bold",
  },
  arrowup: {
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "20px solid",
    paddingBottom: "10px",
  },
  arrowdown: {
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderTop: "20px solid",
    margin: "5px",
  },
};

const TopicItem = (props) => {
  const { classes, userId, userVotes, id, title, content } = props;

  const [topColor, setTopColor] = useState("#484848");
  const [bottomColor, setBottomColor] = useState("#484848");
  const [sumOfVotes, setSumOfVotes] = useState(0);
  const [vote, setVote] = useState(0);
  const [votersList, setVotersList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let initialVote = 0;
      if (userVotes.filter((item) => item.userId === userId)[0]) {
        initialVote = userVotes.filter((item) => item.userId === userId)[0].vote;
        setVote(initialVote);
      }
      if (userVotes.map((item) => item.vote).length > 0) {
        setSumOfVotes(
          userVotes.map((item) => item.vote).reduce((a, b) => a + b)
        );
      } else setSumOfVotes(0);

      if (initialVote === 1) {
        setTopColor("#44a6c6");
        setBottomColor("lightgray");
      } else if (initialVote === -1) {
        setTopColor("lightgray");
        setBottomColor("#44a6c6");
      }
    }
    fetchData();
  }, []);

  const handleTopButton = () => {
    if (vote !== 1) {
      setTopColor("#44a6c6");
      setBottomColor("lightgray");
      setVote(1);
      updatePatch(1);
    }
  };

  const handleBottomButton = () => {
    if (vote !== -1) {
      setTopColor("lightgray");
      setBottomColor("#44a6c6");
      setVote(-1);
      updatePatch(-1);
    }
  };

  const updatePatch = (vote) => {
    const voters = {};
    voters.userId = userId;
    voters.vote = vote;

    axios
      .get(`http://localhost:3001/proposedTopics/${id}`)
      .then((result) => {
        const listOfVoters = result.data.userVotes;
        let sumVotes = 0;
        let hasVoted = false;
        for (let key in listOfVoters) {
          if (listOfVoters[key].userId === voters.userId) {
            listOfVoters[key].vote = voters.vote;
            hasVoted = true;
          }
        }
        if (hasVoted === false) {
          listOfVoters.push(voters);
        }

        if (listOfVoters.map((item) => item.vote).length > 0) {
          sumVotes = listOfVoters
              .map((item) => item.vote)
              .reduce((a, b) => a + b);
        }
        console.log(listOfVoters, sumVotes);
        setVotersList(listOfVoters);
        setSumOfVotes(sumVotes);
        sendVote(listOfVoters, sumVotes);
      })
  };

  const sendVote = (listOfVoters, sumVotes) => {
    console.log('sendingVote', userVotes, sumOfVotes);
    axios.patch(
      `http://localhost:3001/proposedTopics/${id}`,
      {
        userVotes: listOfVoters,
        sumOfVotes: sumVotes,
      },
      { headers: { "Content-Type": "application/json" } }
    );
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
        <Grid item style={{ width: "calc(100% - 170px)" }}>
          <Grid
            container
            className={classes.container}
            direction="column"
            alignItems="stretch"
          >
            <Grid item xs className={classes.itemTop}>
              <Typography className={classes.itemTopTypography}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs className={classes.itemBottom}>
              <Typography className={classes.itemBottomTypography}>
                {content}
              </Typography>
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
};

export default withStyles(styles)(TopicItem);
