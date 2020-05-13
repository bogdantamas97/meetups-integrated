import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { useSpring, animated } from "react-spring";

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    border: "1px solid #b8bdc4",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderTopStyle: "none",
  },
  pointsItem: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "1-%",
  },
  iconItems: {
    width: "10%",
  },
  points: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  typography: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  iconImg: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "6px",
    width: "70%",
  },
};

const AchievementsItem = (props) => {
  const { classes } = props;

  const animation = useSpring({
    height: "100%",
    from: { height: "0%" },
    width: "100%",
    config: {
      mass: 5,
      tension: 300,
      friction: 300,
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
        <Grid container className={classes.textContainer}>
          <Typography className={classes.typography}>{props.title}</Typography>
        </Grid>
        <Grid item className={classes.pointsItem}>
          <Avatar className={classes.points}>
            <Typography className={classes.typography}>
              {props.points}
            </Typography>
            <Typography
              className={classes.typography}
              style={{ fontSize: "x-small" }}
            >
              points
            </Typography>
          </Avatar>
        </Grid>
        <Grid container className={classes.iconItems}>
          <img className={classes.iconImg} src={props.picturePath} alt={""} />
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default withStyles(styles)(AchievementsItem);
