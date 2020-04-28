import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { green } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { theme } from "../../GlobalTheme/globalTheme";

const styles = {
  summary: theme.typography.subheading,
  achiv: theme.typography.captionProfile,
  achivNext: theme.typography.caption,
  root: {
    flexGrow: 1
  },
  spacing: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
};

class Header extends Component {
  state = {
    points: 0,
    allPoints: [],
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3001/users/${this.props.userId}`)
      .then(result => {
        const points = result.data.points;
        this.setState({ points });
      });
    axios.get("http://localhost:3001/achievements").then(result => {
      const allPoints = result.data;
      const isLoaded = true;
      this.setState({ allPoints, isLoaded });
    });
  }

  nextAchievement = () => {
    const data = this.state.allPoints.filter(item => {
      return this.state.points <= item.points;
    });

    return (
      <Fragment>
        {data.length !== 0 ? (
          <Fragment>
            <div style={{ marginTop: "20px" }}>
              <Typography style={styles.achivNext} align="right">
                next Achievement: {`${data[0].points} points`}
              </Typography>
            </div>
            <Typography style={{ color: green[500] }} align="right">
              {data[0].title}
            </Typography>
          </Fragment>
        ) : (
          <Typography style={styles.achivNext} align="right">
            no next achievement
          </Typography>
        )}
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={15} square={true} className={classes.spacing}>
          <Typography className={classes.summary}>Summary</Typography>
          {this.state.isLoaded ? (
            <React.Fragment>
              <div style={{ marginTop: "20px" }}>
                <Typography className={classes.summary} align="right">
                  {this.state.points} Points
                </Typography>
              </div>
              {this.nextAchievement()}
              <Grid
                container
                justify="space-evenly"
                style={{ width: "64%", marginLeft: "40%", marginTop: "10px" }}
              >
                <Link style={{ textDecoration: "none" }} to={"/leaderboard"}>
                  <Typography style={styles.achiv} align="right">
                    Leaderboard
                  </Typography>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/achievements"}>
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
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
