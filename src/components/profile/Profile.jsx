import Header from "./Header";
import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { List, ListItem } from "@material-ui/core";
import ListComponent from "../leaderboard/ListComponent.jsx";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { theme } from "../../GlobalTheme/globalTheme";
import { Paper } from "@material-ui/core";
import Cookies from 'universal-cookie';

const apiBaseUrl = "http://localhost:3001/pointsReceived";

const styles = (theme) => ({
  typography: theme.typography.body1,
  root: {
    flexGrow: 1,
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
  },
});

const Profile = (props) => {
  const [content, setContent] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [elementsToShow, setElementsToShow] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(apiBaseUrl);
      setLoaded(true);
      setContent(result.data.filter((item) => item.userId === new Cookies().get("token")));
    }
    fetchData();
  }, []);

  const Pagination = () => {
    if (!!content[0]) {
      return content[0].points
        .filter((item) => {
          return content[0].points.indexOf(item) < elementsToShow;
        })
        .map((item) => {
          const tag = "item" + item.id;
          return (
            <ListItem id={tag} key={item.id}>
              <ListComponent
                name={`+${item.value} ${item.type}`}
                points={item.date}
              />
            </ListItem>
          );
        });
    } else {
      return (
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
    }
  };

  const handleClickLoadMore = () => {
    const numberOfElements = elementsToShow + 5;
    setElementsToShow(numberOfElements);
  };

  const classes = props.classes;

  return (
    <MainLayout topBarTitle="My Profile">
      <div className={classes.root}>
        <Header userId={props.userId} />
        {isLoaded ? (
          <List id="thelist" className={classes.List}>
            {Pagination()}
          </List>
        ) : (
          "loading"
        )}
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
      </div>
    </MainLayout>
  );
};

export default withStyles(styles)(Profile);
