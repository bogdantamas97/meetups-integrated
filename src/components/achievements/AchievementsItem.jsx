import React from "react";
import { useSpring, animated } from "react-spring";
import { Typography, withStyles, Grid, Avatar } from "@material-ui/core";

import { achievementsItemStyles } from "../../styles";

const AchievementsItem = (props) => {
  const { classes, color, points, title, picturePath } = props;

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
    backgroundColor: color.toString(),
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
          <Typography className={classes.typography}>{title}</Typography>
        </Grid>
        <Grid item className={classes.pointsItem}>
          <Avatar className={classes.points}>
            <Typography className={classes.typography}>{points}</Typography>
            <Typography
              className={classes.typography}
              style={{ fontSize: "x-small" }}
            >
              points
            </Typography>
          </Avatar>
        </Grid>
        <Grid container className={classes.iconItems}>
          <img className={classes.iconImg} src={picturePath} alt={""} />
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default withStyles(achievementsItemStyles)(AchievementsItem);
