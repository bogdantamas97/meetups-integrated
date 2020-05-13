import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import {
  withStyles,
  Typography,
  ListItem,
  List,
  Snackbar,
  Slide
} from "@material-ui/core";
import { theme } from "../../GlobalTheme/globalTheme";
import ListComponent from "./ListComponent.jsx";
import LeaderboardPic from "../../images/leaderboardPic.png";
import axios from "axios";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    height: "100%",
    width: "100%"
  },
  header: {
    height: "30%",
    width: "100%"
  },
  content: {
    height: "70%",
    width: "100%"
  },
  image: {
    height: "90%",
    width: "50%",
    marginLeft: "25%"
  },
  List: {
    width: "100%",
    height: "60%",
  },
  ListItem: {
    height: "20%"
  },
  typography: theme.typography.body1,
  loadMore: {
    height: "20%",
    width: "100%",
    marginTop: 40
  },
  button: {
    textTransform: "none",
    width: "30%",
    marginLeft: "35%"
  }
};

const Leaderboard = props => {
  const { classes } = props;

  //  Hooks declaration
  const [info, setInfo] = useState([{}]); // info is the state, setInfo is the method that changes the state(setState), useState() - sets the default value of the state
  const [isLoaded, changeLoad] = useState(false);
  const [isActive, changeActive] = useState(false);

  let page = 1; // tracks the number of the page I have to load

  // Specific method to Hooks that replaces the componentDidMount method
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "http://localhost:3001/leaderboards?_page=1&_limit=5&_expand=users"
      );
      setInfo(result.data);
      changeLoad(true);
    }
    fetchData();
  }, []);

  const loadMore = async () => {
    if (info.length % 5 === 0) {
      const result = await axios(
        `http://localhost:3001/leaderboards?_page=${++page}&_limit=5&_expand=users`
      );
      setInfo(info.concat(result.data));
      changeActive(true);
    } else {
    }
  };

  const handleClose = () => {
    changeActive(false);
  };

  const transitionUp = props => {
    return <Slide {...props} direction="up" />;
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
            {isLoaded
              ? info.map(item => {
                console.log('something',item)
                return (
                  <ListItem className={classes.ListItem} key={item.id}>
                    <ListComponent
                      id={`#${item.id}`}
                      name={'nothing'}
                      points={
                      // ${item.users.points}
                      '0 points'}
                    />
                  </ListItem>
                )
              })
              : undefined}
          </List>
          <div className={classes.loadMore}>
            <Button className={classes.button}>
              <Typography
                className={classes.typography}
                onClick={() => loadMore()}
              >
                Load more
              </Typography>
            </Button>
            <Snackbar
              open={isActive}
              onClose={handleClose}
              TransitionComponent={transitionUp}
              autoHideDuration={2000}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">List was updated</span>}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withStyles(styles)(Leaderboard);
