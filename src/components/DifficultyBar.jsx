import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { withStyles } from "@material-ui/core/styles";
import { difficultyBar, theme } from "../GlobalTheme/globalTheme.js";
import { Typography } from "@material-ui/core";

const styles = {
  difficultyBar: difficultyBar,
  typography: theme.typography
};

const DifficultyBar = () =>{
  const { classes } =props;
  const difficultyBarText = "B - Beginner | I - Intermediate | A - Advanced | E - Expert";
  
    return (
      <BottomNavigation className={classes.difficultyBar}>
        <Typography style={styles.typography.difficultyFont}>
          {" "}
          {difficultyBarText}{" "}
        </Typography>
      </BottomNavigation>
    );
}

export default withStyles(styles)(DifficultyBar);
