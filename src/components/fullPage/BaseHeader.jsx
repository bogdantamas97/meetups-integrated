import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Typography,
  Tooltip,
  Toolbar,
  withStyles,
} from "@material-ui/core";

import TemporaryDrawer from "../TemporaryDrawer.jsx";


const styles = () => ({
  topBar: {
    flexGrow: 1,
    border: "3px double rgba(30,111,164,0.6)",
    borderRadius: "15px",
  },
  avatar: {
    width: "50px",
    height: "50px",
  },
});

const getInitials = (fullName) => {
  let initials = fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
};

const BaseHeader = (props) => {
  const { classes, fullName } = props;

  return (
    <div className={classes.topBar}>
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          {props.inputText}
        </Typography>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Tooltip title="Go to profile">
            <Avatar className={classes.avatar}>
              <Typography variant="h5" color="inherit">
                {getInitials(fullName)}
              </Typography>
            </Avatar>
          </Tooltip>
        </Link>
      </Toolbar>
    </div>
  );
};

export default withStyles(styles)(BaseHeader);
