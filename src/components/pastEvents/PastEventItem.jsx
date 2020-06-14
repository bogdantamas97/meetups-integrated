import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";

import { eventTitle, eventSubtitle, pastEventsItemStyles } from "../../styles";
import {
  fontTitle,
  fontSubtitle,
} from "../../helpers";

const PastEventItem = (props) => {
  const {
    classes,
    name,
    itemId,
    userId,
    eventId,
    isDisabled,
    feedbackText,
    date,
    time,
    lang,
    secondLine,
    changeButtonStateById,
    handleFeedbackClick,
  } = props;
  const [width, updateWidth] = useState(0);

  const updateWidthFunction = () => updateWidth(window.innerWidth);

  useEffect(() => {
    updateWidthFunction();
    window.addEventListener("resize", updateWidthFunction);
    return () => {
      window.removeEventListener("resize", updateWidthFunction);
    };
  }, []);

  const handleOnClick = () => {
    changeButtonStateById(itemId, true);
    handleFeedbackClick(userId, eventId, name);
  };

  const animation = useSpring({
    height: "100%",
    from: { height: "0%" },
    width: "100%",
    config: {
      mass: 1,
      tension: 340,
      friction: 30,
    },
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
              style={{ height: 20, marginTop: 8 }}
            >
              <Typography
                style={{
                  fontSize: fontTitle(width),
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
                  fontSize: fontSubtitle(width),
                  fontFamily: eventSubtitle.fontFamily,
                  color: eventSubtitle.color,
                  fontWeight: eventSubtitle.fontWeight,
                }}
              >
                {secondLine}
              </Typography>
            </Grid>
            <Grid item className={classes.itemBottom}>
              <Button
                variant="contained"
                disabled={isDisabled}
                className={classes.buttonStyle}
                onClick={handleOnClick}
              >
                <Typography className={classes.typographyButton}>
                  {feedbackText}
                </Typography>
              </Button>
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

PastEventItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pastEventsItemStyles)(PastEventItem);
