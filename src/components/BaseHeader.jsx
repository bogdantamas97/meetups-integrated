import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TemporaryDrawer from "./TemporaryDrawer.jsx";
import { Link } from "react-router-dom";


const styles = () => ({
  topBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const getInitials = (fullName) => {
    let initials = fullName.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };

const BaseHeader = (props) => {
  const { classes, userFullName } = props;

  return (
    <div className={classes.topBar}>
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h6" color="inherit" className={classes.topBar}>
          {props.inputText}
        </Typography>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar>
            <Typography variant="h6" color="inherit">
              {getInitials(userFullName)}
            </Typography>
          </Avatar>
        </Link>
      </Toolbar>
    </div>
  );
};

export default withStyles(styles)(BaseHeader);
