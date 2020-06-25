import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Typography,
  Tooltip,
  Toolbar,
  withStyles,
} from "@material-ui/core";

import { TemporaryDrawer } from "..";
import { baseHeaderStyles } from "../../styles";
import { getInitials } from "../../helpers";

const BaseHeader = (props) => {
  const { classes, fullName, inputText } = props;

  return (
    <div className={classes.topBar}>
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          {inputText}
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

export default withStyles(baseHeaderStyles)(BaseHeader);
