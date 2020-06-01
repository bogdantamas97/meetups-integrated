import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

import {
  eventTitle,
  eventSubtitle,
  eventBottom,
} from "../../GlobalTheme/globalTheme";
import { Avatar, Grid, Typography, withStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const styles = {
  content: {
    width: "100%",
    height: "100%",
    borderBottom: "1px solid #c0c3c6",
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
  },
  itemMiddle: {
    height: 15,
  },
  itemBottom: {
    height: 9,
    marginTop: 5,
  },
  hoverButton: {
    "&:hover": {
      color: blue[100],
    },
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
  timeFrame: {
    width: 80,
    height: 50,
    borderStyle: "solid",
    border: 1,
    borderRadius: 20,
    borderColor: "#10cfcf",
    marginRight: "5%",
    marginTop: "10%",
  },
  typographyThreeTop: {
    marginLeft: 6,
    marginTop: 10,
  },
  typographyThreeBottom: {
    marginLeft: 20,
    marginTop: -6,
  },
};

const FutureEventItem = (props) => {
  const { classes } = props;

  const [width, updateWidth] = useState(0);
  //   let fontTitle, fontSubtitle, fontBottom;

  const fontTitle = () => {
    while (width < 1024) return 10 + width / 140;
    return 17;
  };

  const fontSubtitle = () => {
    while (width < 1024) return 8 + width / 140;
    return 15;
  };

  const fontBottom = () => {
    while (width < 1024) return 6 + width / 140;
    return 13;
  };

  const updateWidthFunction = () => {
    updateWidth(window.innerWidth);
  };

  const checkSubscribe = () => {
    if (props.action === "Subscribe") return true;
    return false;
  };

  const checkWaitingList = () => {
    if (props.action === "Waiting List") return true;
    return false;
  };
  const checkUnsubscribe = () => {
    if (props.action === "Unsubscribe") return true;
    return false;
  };

  const animation = useSpring({
    height: "100%",
    from: { height: "0%", width: "50%" },
    width: "100%",
    config: {
      mass: 3,
      tension: 340,
      friction: 30,
    },
    border: "2px dotted rgba(28,110,164,0.45)",
    borderRadius: "10px",
  });

  useEffect(() => {
    updateWidthFunction();
    window.addEventListener("resize", updateWidthFunction);

    return () => {
      window.removeEventListener("resize", updateWidthFunction);
    };
  }, []);

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
            <Typography className={classes.typography}>{props.lang}</Typography>
          </Avatar>
        </Grid>
        <Grid item style={{ width: "calc(100% - 170px)", height: 73 }}>
          <Grid
            container
            className={classes.container}
            direction="column"
            alignItems="stretch"
          >
            <Grid
              container
              alignItems="center"
              style={{ height: 20, marginTop: 5 }}
            >
              <Typography
                style={{
                  fontSize: fontTitle(),
                  fontFamily: eventTitle.fontFamily,
                  color: eventTitle.color,
                  fontWeight: eventTitle.fontWeight,
                }}
              >
                {props.name}
              </Typography>
            </Grid>
            <Grid item className={classes.itemMiddle}>
              <Typography
                style={{
                  fontSize: fontSubtitle(),
                  fontFamily: eventSubtitle.fontFamily,
                  color: eventSubtitle.color,
                  fontWeight: eventSubtitle.fontWeight,
                }}
              >
                {props.secondLine}
              </Typography>
            </Grid>
            <Grid item className={classes.itemBottom}>
              <Typography
                style={{
                  fontSize: fontBottom(),
                  fontFamily: eventBottom.fontFamily,
                  color: eventBottom.color,
                  fontWeight: eventBottom.fontWeight,
                }}
                onClick={
                  checkSubscribe()
                    ? props.handleSubscribeClick
                    : checkWaitingList()
                    ? props.handleWaitingListClick
                    : checkUnsubscribe()
                    ? props.handleUnsubscribeClick
                    : () => {}
                }
              >
                <div className={classes.hoverButton}>{props.action}</div>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          className={classes.itemThree}
        >
          <div className={classes.timeFrame}>
            <Typography className={classes.typographyThreeTop}>
              {props.date}
            </Typography>
            <Typography className={classes.typographyThreeBottom}>
              {props.time}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </animated.div>
  );
};

FutureEventItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FutureEventItem);
