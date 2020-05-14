import React from "react";
import {
  BottomNavigation,
  withStyles,
  Typography,
} from "@material-ui/core";
import { difficultyBar, theme } from "../GlobalTheme/globalTheme.js";

const styles = {
  difficultyBar: difficultyBar,
  typography: theme.typography,
};

const DifficultyBar = (props) => {
  const { classes } = props;
  const difficultyBarText =
    "B - Beginner | I - Intermediate | A - Advanced | E - Expert";

  return (
    <BottomNavigation className={classes.difficultyBar}>
      <Typography style={styles.typography.difficultyFont}>
        {" "}
        {difficultyBarText}{" "}
      </Typography>
    </BottomNavigation>
  );
};

export default withStyles(styles)(DifficultyBar);
