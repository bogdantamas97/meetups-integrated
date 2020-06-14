import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Grid, Typography, withStyles  } from "@material-ui/core";
import { useSpring, animated } from "react-spring";

import { PROPOSED_TOPICS_URL } from "../../constants/index";
import { topicItemStyles } from '../../styles';

const TopicItem = (props) => {
  const { classes, userId, userVotes, id, title, content } = props;

  const [topColor, setTopColor] = useState("#484848");
  const [bottomColor, setBottomColor] = useState("#484848");
  const [sumOfVotes, setSumOfVotes] = useState(0);
  const [vote, setVote] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let initialVote = 0;
      if (userVotes.filter((item) => item.userId === userId)[0]) {
        initialVote = userVotes.filter((item) => item.userId === userId)[0]
          .vote;
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

    axios.get(`${PROPOSED_TOPICS_URL}/${id}`).then((result) => {
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
      setSumOfVotes(sumVotes);
      sendVote(listOfVoters, sumVotes);
    });
  };

  const sendVote = (listOfVoters, sumVotes) => {
    axios.patch(
      `${PROPOSED_TOPICS_URL}/${id}`,
      {
        userVotes: listOfVoters,
        sumOfVotes: sumVotes,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  };

  const animation = useSpring({
    width: "90%",
    margin: "auto",
    height: "100%",
    from: { height: "20%", width: "50%" },
    config: {
      mass: 3,
      tension: 350,
      friction: 30,
    },
    border: "1px dotted rgba(28,110,164,0.45)",
    borderRadius: "10px",
  });

  return (
    <animated.div style={animation}>
      <Grid
        container
        className={classes.container}
        direction="row"
        alignItems="stretch"
      >
        <Grid item className={classes.itemOne}>
          <Avatar className={classes.avatar}>
            <Typography className={classes.typography}>{sumOfVotes}</Typography>
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
    </animated.div>
  );
};

export default withStyles(topicItemStyles)(TopicItem);
