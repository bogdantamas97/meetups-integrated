import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { withStyles } from "@material-ui/core/styles";
import { difficultyBar, theme } from "../GlobalTheme/globalTheme.js";
import { Typography } from "@material-ui/core";

const styles = {
  difficultyBar: difficultyBar,
  typography: theme.typography
};

class DifficultyBar extends React.Component {
  render() {
    const difficultyBarText =
      "B - Beginner | I - Intermediate | A - Advanced | E - Expert";
    const classes = this.props.classes;
    return (
      <BottomNavigation className={classes.difficultyBar}>
        <Typography style={styles.typography.difficultyFont}>
          {" "}
          {difficultyBarText}{" "}
        </Typography>
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(DifficultyBar);
