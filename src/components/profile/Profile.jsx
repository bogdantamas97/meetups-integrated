import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { MainLayout } from "../../layouts/index";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  Typography,
  withStyles,
  Paper,
} from "@material-ui/core";
import Header from "./Header";
import { profileStyles } from "../../styles";
import { theme } from "../../styles/globalTheme";
import ListComponent from "../leaderboard/LeaderboardItem.jsx";
import { POINTS_RECEIVED_URL } from "../../constants/index";

const Profile = (props) => {
  const [width, updateWidth] = useState(0);
  const [points, setPoints] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [elementsToShow, setElementsToShow] = useState(5);

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

  useEffect(() => {
    async function fetchData() {
      const result = await axios(POINTS_RECEIVED_URL);
      const hasPoints = result.data.filter(
        (item) => item.userId === new Cookies().get("token")
      )[0];

      setLoaded(true);
      if (hasPoints) {
        setPoints(hasPoints.points);
      }
    }

    fetchData();
  }, []);

  const handleClickLoadMore = () => {
    const numberOfElements = elementsToShow + 5;
    setElementsToShow(numberOfElements);
  };

  const Pagination = () => {
    return points !== undefined ? (
      points
        .filter((item) => points.indexOf(item) < elementsToShow)
        .map((item) => (
          <ListItem key={item.id}>
            <ListComponent
              name={`+${item.value} ${item.type}`}
              points={item.date}
            />
          </ListItem>
        ))
    ) : (
      <Paper
        style={{
          display: "flex",
          marginTop: "10%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "80%",
          height: "30%",
          marginLeft: "10%",
          textAlign: "center",
        }}
      >
        <Typography style={theme.typography.title}>
          You have no recent history.
        </Typography>
      </Paper>
    );
  };

  const { classes } = props;

  return (
    <MainLayout topBarTitle="My Profile">
      <div className={classes.root}>
        <Header userId={props.userId} />
        {isLoaded ? (
          <List className={classes.List}>{Pagination()}</List>
        ) : (
          <div>
            <CircularProgress
              style={{
                width: "120px",
                height: "120px",
                marginTop: "180px",
                marginLeft: (width - 180) / 2,
              }}
            />
            <h2
              style={{
                width: "120px",
                height: "120px",
                marginLeft: (width - 180) / 2,
              }}
            >
              LOADING...
            </h2>
          </div>
        )}
        {isLoaded && (
          <div className={classes.loadmore}>
            <Button className={classes.button}>
              <Typography
                className={classes.typography}
                onClick={handleClickLoadMore}
              >
                Load more
              </Typography>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default withStyles(profileStyles)(Profile);
