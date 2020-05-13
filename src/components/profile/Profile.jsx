import Header from "./Header";
import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  Typography,
  withStyles,
  Paper,
} from "@material-ui/core";
import ListComponent from "../leaderboard/ListComponent.jsx";
import axios from "axios";
import { theme } from "../../GlobalTheme/globalTheme";
import Cookies from "universal-cookie";

const apiBaseUrl = "http://localhost:3001/pointsReceived";

const styles = (theme) => ({
  typography: theme.typography.body1,
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  List: {
    marginTop: "30px",
    width: "100%",
    height: "40%",
    overflowY: "scroll",
  },
  loadmore: {
    height: "20%",
    marginTop: 40,
  },
  button: {
    textTransform: "none",
    margin: "auto",
    width: "100%",
  }
});

const Profile = (props) => {
  const [width, updateWidth] = useState(0);
  const [content, setContent] = useState({});
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
      const result = await axios(apiBaseUrl);
      setLoaded(false);
      setContent(
        result.data.filter(
          (item) => item.userId === new Cookies().get("token")
        )[0]
      );
    }
    fetchData();
  }, []);

  const handleClickLoadMore = () => {
    const numberOfElements = elementsToShow + 5;
    setElementsToShow(numberOfElements);
  };

  const Pagination = () =>
    content.points !== undefined ? (
      content.points
        .filter((item) => content.points.indexOf(item) < elementsToShow)
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
                marginLeft: (width - 180)/ 2,
              }}
            />
            <h2
              style={{
                width: "120px",
                height: "120px",
                marginLeft: (width - 180)/ 2,
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

export default withStyles(styles)(Profile);
