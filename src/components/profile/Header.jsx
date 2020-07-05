import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import axios from "axios";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import {
  DATA_BASE_URL,
  ACHIEVEMENTS_URL,
  POINTS_RECEIVED_URL,
} from "../../constants";
import { headerStyles } from "../../styles";


const Header = (props) => {
  const { classes } = props;

  const [points, setPoints] = React.useState(0);
  const [allPoints, setAllPoints] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(POINTS_RECEIVED_URL);
      const CURRENT_USER_ID = await new Cookies().get("token")
      const hasPoints = result.data.filter(
        (item) => item.userId === CURRENT_USER_ID
      )[0];

      console.log("hasPoints", result, hasPoints, CURRENT_USER_ID);

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
    const CURRENT_USER_ID = await new Cookies().get("token")
    const userData = result.data.find((item) => item.id === CURRENT_USER_ID);

    if (userData) {
      const { firstname, lastname, email, password, id } = userData;
      axios.post(
        DATA_BASE_URL +
          "/update?firstname=" +
          firstname +
          "&lastname=" +
          lastname +
          "&email=" +
          email +
          "&password=" +
          password +
          "&id=" +
          id +
          "&points=" +
          sumOfPoints
      );
    }
  }

  const nextAchievement = (myPoints, allPoints) => {
    const data = allPoints.filter((item) => myPoints < item.points)[0];
    const { points, title } = data;

    return (
      <Fragment>
        {data.length !== 0 ? (
          <Fragment>
            <div style={{ marginTop: "10px" }}>
              <Typography style={headerStyles.achivNext} align="right">
                Next Achievement: {`${points} points`}
              </Typography>
            </div>
            <Typography style={{ color: green[500] }} align="right">
              {title}
            </Typography>
          </Fragment>
        ) : (
          <Typography style={headerStyles.achivNext} align="right">
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
            {nextAchievement(points, allPoints)}
            <Grid
              container
              justify="space-evenly"
              style={{ width: "100%", marginTop: "10px" }}
            >
              <Link className={classes.link} to={"/leaderboard"}>
                <Typography style={headerStyles.achiv} align="right">
                  Leaderboard
                </Typography>
              </Link>
              <Link className={classes.link} to={"/achievements"}>
                <Typography style={headerStyles.achiv} align="right">
                  Achievements
                </Typography>
              </Link>
            </Grid>
          </React.Fragment>
        ) : (
          "Loading..."
        )}
      </Paper>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerStyles)(Header);
