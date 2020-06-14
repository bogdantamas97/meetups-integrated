import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { temporaryDrawerStyles } from "../../styles";

const TemporaryDrawer = (props) => {
  const { classes } = props;

  const [isOpen, setOpen] = useState(false);

  const fullList = (
    <div className={classes.fullList}>
      <List>
        {[
          "All Events",
          "Past Events",
          "My Events",
          "Voted Topics",
          "Leaderboard",
        ].map((text, index) => {
          let linkVar = "";
          switch (text) {
            case "All Events":
              linkVar = "futureEvents";
              break;
            case "Past Events":
              linkVar = "pastEvents";
              break;
            case "My Events":
              linkVar = "myEvents";
              break;
            case "Voted Topics":
              linkVar = "voteTopics";
              break;
            case "Leaderboard":
              linkVar = "leaderboard";
              break;
            default:
              linkVar = "";
          }

          return (
            <Link key={index} to={"/" + linkVar} className={classes.linkCss}>
              <ListItem button key={text} className={classes.item}>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        {["About", "Logout"].map((text, index) => {
          let linkVar = "";
          let handleClick = () => {};
          switch (text) {
            case "About":
              linkVar = "about";
              break;
            case "Logout":
              linkVar = "";
              handleClick = () => new Cookies().remove("token");
              break;
            default:
              linkVar = "";
          }
          return (
            <Link
              key={index}
              to={"/" + linkVar}
              onClick={handleClick}
              className={classes.linkCss}
            >
              <ListItem button key={text} className={classes.item}>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
  return (
    <div>
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>

      <SwipeableDrawer
        open={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(true)}
        >
          {fullList}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default withStyles(temporaryDrawerStyles)(TemporaryDrawer);
