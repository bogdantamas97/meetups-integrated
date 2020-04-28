import Header from "./Header";
import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, Slide, Snackbar } from "@material-ui/core";
import ListComponent from "../leaderboard/ListComponent.jsx";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { theme } from "../../GlobalTheme/globalTheme";
import { Paper } from "@material-ui/core";

const apiBaseUrl = "http://localhost:8000";

const styles = theme => ({
  typography: theme.typography.body1,
  root: {
    flexGrow: 1
  },
  List: {
    marginTop: "30px",
    width: "100%",
    height: "40%",
    overflow: "scroll"
  },
  loadmore: {
    width: "100%",
    height: "20%",
    marginTop: 40
  },
  button: {
    textTransform: "none",
    marginLeft: "40%"
  }
});

const TransitionUp = (props) =>  <Slide {...props} direction="up" />;

const Profile = (props) =>  {
  
  const [content, setContent] = useState([]);
  const [transition, setTranstition] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [elementsToShow, setElementsToShow] = useState(5);

  useEffect(() => {
       axios.get(apiBaseUrl).then(result => {
         setLoaded(true);
         setContent(result.data.filter(item => item.userId === props.userId));
       });
  });
  const Pagination = () => {
    if (!!content[0]) {
      return content[0].points
        .filter(item => {
          return (
            content[0].points.indexOf(item) <
            elementsToShow
          );
        })
        .map(item => (
          <ListItem key={item.id}>
            <ListComponent
              name={`+${item.value} ${item.type}`}
              points={item.date}
            />
          </ListItem>
        ));
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
            textAlign: "center"
          }}
        >
          <Typography style={theme.typography.title}>
            You have no recent history.
          </Typography>
        </Paper>
      );
    }
  };

  const handleClickLoadMore = transition => () => {
    setOpen(true);
    setTranstition(transition);
    setElementsToShow(elementsToShow + 5);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = props.classes;

    return (
      <MainLayout topBarTitle="My Profile">
        <div className={classes.root}>
          <Header userId={props.userId} />
          {isLoaded ? (
            <List className={classes.List}>{Pagination()}</List>
          ) : (
            "loading"
          )}
          <div className={classes.loadmore}>
            <Button className={classes.button}>
              <Typography
                className={classes.typography}
                onClick={handleClickLoadMore(TransitionUp)}
              >
                Load more
              </Typography>
            </Button>
          </div>
          <Snackbar
            open={open}
            onClose={handleClose}
            transitionComponent={transition}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">List was refreshed</span>}
          />
        </div>
      </MainLayout>
    );
}

export default withStyles(styles)(Profile);
