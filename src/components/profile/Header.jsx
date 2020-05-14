import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";
import axios from "axios";
import { green, grey } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { theme } from "../../GlobalTheme/globalTheme";
import Cookies from "universal-cookie";
import {
  DATA_BASE_URL,
  ACHIEVEMENTS_URL,
  POINTS_RECEIVED_URL,
} from "../../constants/index";

const currentUserId = new Cookies().get("token");

const styles = {
  summary: theme.typography.subheading,
  achiv: theme.typography.captionProfile,
  achivNext: theme.typography.caption,
  root: {
    flexGrow: 1,
  },
  spacing: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: "none",
    backgroundColor: grey[100],
    "&:hover": {
      backgroundColor: grey[500],
    },
  },
};

const Header = (props) => {
  const { classes } = props;

  const [points, setPoints] = React.useState(0);
  const [allPoints, setAllPoints] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(POINTS_RECEIVED_URL);
      const hasPoints = result.data.filter(
        (item) => item.userId === new Cookies().get("token")
      )[0];

      if (hasPoints) {
        const sumOfPoints = hasPoints.points
          .map((item) => item.value)
          .reduce((a, b) => a + b);
        setPoints(sumOfPoints);
        updatePoints(sumOfPoints);
      }
      await axios.get(ACHIEVEMENTS_URL).then((result) => {
        setAllPoints(result.data);
        setLoaded(true);
      });
    }
    fetchData();
  }, []);

  async function updatePoints(sumOfPoints) {
    const result = await axios(DATA_BASE_URL);
    const userData = result.data.find((item) => item.id === currentUserId);
    if(userData){
    axios.post(
      DATA_BASE_URL +
        "/update?firstname=" +
        userData.firstname +
        "&lastname=" +
        userData.lastname +
        "&email=" +
        userData.email +
        "&password=" +
        userData.password +
        "&id=" +
        userData.id +
        "&points=" +
        sumOfPoints
    );
    }
  }

  const nextAchievement = () => {
    const data = allPoints.filter((item) => points < item.points)[0];

    return (
      <Fragment>
        {data.length !== 0 ? (
          <Fragment>
            <div style={{ marginTop: "10px" }}>
              <Typography style={styles.achivNext} align="right">
                Next Achievement: {`${data.points} points`}
              </Typography>
            </div>
            <Typography style={{ color: green[500] }} align="right">
              {data.title}
            </Typography>
          </Fragment>
        ) : (
          <Typography style={styles.achivNext} align="right">
            No next achievement
          </Typography>
        )}
      </Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={15} square={true} className={classes.spacing}>
        <Typography className={classes.summary}>Summary</Typography>
        {isLoaded ? (
          <React.Fragment>
            <div style={{ marginTop: "20px" }}>
              <Typography className={classes.summary} align="right">
                {points} Points
              </Typography>
            </div>
            {nextAchievement()}
            <Grid
              container
              justify="space-evenly"
              style={{ width: "100%", marginTop: "10px" }}
            >
              <Link className={classes.link} to={"/leaderboard"}>
                <Typography style={styles.achiv} align="right">
                  Leaderboard
                </Typography>
              </Link>
              <Link className={classes.link} to={"/achievements"}>
                <Typography style={styles.achiv} align="right">
                  Achievements
                </Typography>
              </Link>
            </Grid>
          </React.Fragment>
        ) : (
          "Loading"
        )}
      </Paper>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
