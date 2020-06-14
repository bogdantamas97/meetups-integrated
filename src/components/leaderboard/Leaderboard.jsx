import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  ListItem,
  List,
  Typography,
  withStyles,
} from "@material-ui/core";

import ListComponent from "./LeaderboardItem.jsx";
import { leaderboardPic } from "../../images/index";
import { MainLayout } from "../../layouts/index";
import { DATA_BASE_URL } from "../../constants/index";
import { leaderboardStyles } from "../../styles";


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

  const loadMore = () => setNumberOfItems(numberOfItems + 5);

  return (
    <MainLayout>
      <div className={classes.root}>
        <div className={classes.header}>
          <img
            alt="Trophie with medal"
            className={classes.image}
            src={leaderboardPic}
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

export default withStyles(leaderboardStyles)(Leaderboard);
