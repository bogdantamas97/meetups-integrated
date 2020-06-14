import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

import {
  eventTitle,
  eventSubtitle,
  eventBottom,
  futureEventItemStyles
} from "../../styles";
import { Avatar, Grid, Typography, withStyles } from "@material-ui/core";

const FutureEventItem = (props) => {
  const {
    action,
    classes,
    date,
    handleSubscribeClick,
    handleWaitingListClick,
    handleUnsubscribeClick,
    lang,
    name,
    time,
    secondLine,
  } = props;

  const [width, updateWidth] = useState(0);

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
    if (action === "Subscribe") return true;
    return false;
  };

  const checkWaitingList = () => {
    if (action === "Waiting List") return true;
    return false;
  };
  const checkUnsubscribe = () => {
    if (action === "Unsubscribe") return true;
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
            <Typography className={classes.typography}>{lang}</Typography>
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
                {name}
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
                {secondLine}
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
                    ? handleSubscribeClick
                    : checkWaitingList()
                    ? handleWaitingListClick
                    : checkUnsubscribe()
                    ? handleUnsubscribeClick
                    : () => {}
                }
              >
                <div className={classes.hoverButton}>{action}</div>
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
              {date}
            </Typography>
            <Typography className={classes.typographyThreeBottom}>
              {time}
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

export default withStyles(futureEventItemStyles)(FutureEventItem);
