import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import { withStyles, Typography, ListItem, List } from "@material-ui/core";
import { theme } from "../../GlobalTheme/globalTheme";
import ListComponent from "./ListComponent.jsx";
import LeaderboardPic from "../../images/leaderboardPic.png";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { DATA_BASE_URL } from "../../constants/index";

const styles = {
  root: {
    height: "100%",
    width: "100%",
  },
  header: {
    height: "30%",
    width: "100%",
  },
  content: {
    height: "70%",
    width: "100%",
  },
  image: {
    height: "90%",
    width: "50%",
    marginLeft: "25%",
  },
  List: {
    width: "100%",
    height: "60%",
    overflowY: "scroll",
  },
  ListItem: {
    height: "20%",
  },
  typography: theme.typography.body1,
  loadMore: {
    height: "20%",
    width: "100%",
    marginTop: 40,
  },
  button: {
    textTransform: "none",
    width: "30%",
    marginLeft: "35%",
  },
};

const Leaderboard = (props) => {
  const { classes } = props;

  //  Hooks declaration
  const [info, setInfo] = useState([{}]); // info is the state, setInfo is the method that changes the state(setState), useState() - sets the default value of the state
  const [isLoaded, changeLoad] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(5);

  // Specific method to Hooks that replaces the componentDidMount method
  useEffect(() => {
    async function fetchData() {
      const result = await axios(DATA_BASE_URL);
      setInfo(result.data.sort((a, b) => (a.points > b.points ? -1 : 1)));
      changeLoad(true);
    }
    fetchData();
  }, []);

  const loadMore = async () => {
    setNumberOfItems(numberOfItems + 5);
  };

  return (
    <MainLayout>
      <div className={classes.root}>
        <div className={classes.header}>
          <img
            alt="Trophie with medal"
            className={classes.image}
            src={LeaderboardPic}
          />
        </div>
        <div className={classes.content}>
          <List className={classes.List}>
            {isLoaded &&
              info.slice(0, numberOfItems).map((item) => (
                <ListItem className={classes.ListItem} key={item.id}>
                  <ListComponent
                    id={`#${item.id}`}
                    name={`${item.lastname} ${item.firstname}`}
                    points={`${item.points} points`}
                  />
                </ListItem>
              ))}
          </List>
          <div className={classes.loadMore}>
            <Button className={classes.button}>
              <Typography className={classes.typography} onClick={loadMore}>
                Load more
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withStyles(styles)(Leaderboard);
