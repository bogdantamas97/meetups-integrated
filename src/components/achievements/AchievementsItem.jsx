import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { eventSubtitle } from "../../GlobalTheme/globalTheme";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "15%",
    border: "1px solid #b8bdc4",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderTopStyle: "none"
  },
  pointsItem: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "15%"
  },
  iconItems: {
    width: "15%"
  },
  points: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  typography: {
    fontWeight: "bold"
  },
  pDescription: {
    fontSize: eventSubtitle.fontSize,
    color: eventSubtitle.color
  },
  iconImg: {
    width: "100%",
    height: "100%"
  },
  textContainer: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "6px",
    width: "70%"
  }
};

const AchievementsItem = props => { 
    const { classes } = props;

    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        alignItems="stretch"
      >
        <Grid item className={classes.pointsItem}>
          <Avatar className={classes.points}>
            <Typography
              className={classes.typography}
              style={{ fontSize: "medium" }}
            >
              {this.props.points}
            </Typography>
            <Typography
              className={classes.typography}
              style={{ fontSize: "x-small" }}
            >
              points
            </Typography>
          </Avatar>
        </Grid>
        <Grid container className={classes.textContainer}>
          <Typography className={classes.typography}>
            {this.props.title}
          </Typography>
          <Typography className={classes.pDescription}>
            {this.props.description}
          </Typography>
        </Grid>
        <Grid container className={classes.iconItems}>
          <img
            className={classes.iconImg}
            src={this.props.picturePath}
            alt={""}
          />
        </Grid>
      </Grid>
    );
  }

export default withStyles(styles)(AchievementsItem);
