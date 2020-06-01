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

import { eventTitle, eventSubtitle } from "../../GlobalTheme/globalTheme";

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
    height: 5,
    fontSize: 8 + "px",
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
  buttonStyle: {
    borderRadius: 20 + "px",
    height: 20 + "px",
    width: 175 + "px",
    fontSize: 11 + "px",
    marginTop: 3 + "px",
    marginBotton: 30 + "px",
    boxShadow: ["none"],
    shadows: ["none"],
    backgroundColor: "#7cff89",
  },
  typographyButton: {
    marginTop: -5 + "px",
    color: "#282828",
    textTransform: ["none"],
    fontSize: 12 + "px",
    fontWeight: 600,
  },
};

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

  const fontTitle = () => {
    if (width < 1024) return 7 + width / 100;
    return 17;
  };

  const fontSubtitle = () => {
    if (width < 1024) return 5 + width / 100;
    return 15;
  };

  const updateWidthFunction = () => updateWidth(window.innerWidth);

  useEffect(() => {
    updateWidthFunction();
    window.addEventListener("resize", updateWidthFunction);
    return () => {
      window.removeEventListener("resize", updateWidthFunction);
    };
  }, []);

  // Click event for FeedbackButton
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

export default withStyles(styles)(PastEventItem);
