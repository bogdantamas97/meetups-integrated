import React, { useState, useEffect } from "react";
import { withStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { eventTitle, eventSubtitle } from "../../GlobalTheme/globalTheme";
import Avatar from "@material-ui/core/Avatar";
import { useSpring, animated } from "react-spring";

const styles = {
  content: {
    width: "100%",
    height: "100%",
    borderBottom: "1px solid #c0c3c6"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  itemOne: {
    width: 65
  },
  itemThree: {
    width: 105
  },
  itemMiddle: {
    height: 15,
    marginTop: 5
  },
  itemBottom: {
    height: 5,
    fontSize: 8 + "px"
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: "5%",
    marginTop: 10
  },
  typography: {
    fontWeight: "bold"
  },
  timeFrame: {
    width: 80,
    height: 50,
    borderStyle: "solid",
    border: 1,
    borderRadius: 20,
    borderColor: "#10cfcf",
    marginRight: "5%",
    marginTop: "10%"
  },
  typographyThreeTop: {
    marginLeft: 6,
    marginTop: 10
  },
  typographyThreeBottom: {
    marginLeft: 20,
    marginTop: -6
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
    backgroundColor: "#7cff89"
  },
  typographyButton: {
    marginTop: -5 + "px",
    color: "#282828",
    textTransform: ["none"],
    fontSize: 12 + "px",
    fontWeight: 600
  }
};

const PastEventItem = props => {
  console.log(props);
  const { classes, itemId, userId, eventId, name } = props;
  const [width, updateWidth] = useState(0);

  const fontTitle = () => {
    if (width < 1024) return 8 + width / 90;
    return 20;
  };

  const fontSubtitle = () => {
    if (width < 1024) return 6.5 + width / 90;
    return 15;
  };

  const willOverflow = () => {
    if (width < 400) return "scroll";
    return "visible";
  };

  const updateWidthFunction = () => {
    updateWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWidthFunction();
    window.addEventListener("resize", updateWidthFunction);
    return () => {
      window.removeEventListener("resize", updateWidthFunction);
    };
  }, []);

  // Click event for FeedbackButton
  const handleOnClick = () => {
    props.changeButtonStateById(itemId, true);
    props.handleFeedbackClick(userId, eventId, name);
  };

  const animatedHeight = useSpring({
    height: "100%",
    from: { height: "0%" },
    width: "100%",
    config: {
      mass: 1,
      tension: 340,
      friction: 30
    }
  });

  return (
    <animated.div style={animatedHeight}>
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
              style={{ height: 20, marginTop: 8, overflow: willOverflow() }}
            >
              <Typography
                style={{
                  fontSize: fontTitle(),
                  fontFamily: eventTitle.fontFamily,
                  color: eventTitle.color,
                  fontWeight: eventTitle.fontWeight
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
                  fontWeight: eventSubtitle.fontWeight
                }}
              >
                {props.secondLine}
              </Typography>
            </Grid>
            <Grid item className={classes.itemBottom}>
              <Button
                variant="contained"
                color="#7cff89"
                disabled={props.isDisabled}
                className={classes.buttonStyle}
                onClick={handleOnClick}
              >
                <Typography className={classes.typographyButton}>
                  {props.feedbackText}
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

PastEventItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PastEventItem);
