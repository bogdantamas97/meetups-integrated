import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";

import { theme } from "../../styles/globalTheme";
import { leaderboardItemStyles } from "../../styles";

const LeaderboardItem = (props) => {
  const { classes, name, points } = props;

  return (
    <div style={{ margin: "auto", width: "50%", height: "100%" }}>
      <Paper className={classes.paper} elevation={9} square={true}>
        <Grid
          container
          direction="row"
          className={classes.grid}
          alignItems="center"
        >
          <Grid item className={classes.itemOne}>
            <Typography style={{ color: theme.palette.primary.light }}>
              {name}
            </Typography>
          </Grid>
          <Grid item className={classes.itemTwo}>
            <Typography style={{ color: theme.palette.primary.light }}>
              {points}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

LeaderboardItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
};

LeaderboardItem.defaultProps = {
  id: "",
  name: "Username",
  points: "",
};

export default withStyles(leaderboardItemStyles)(LeaderboardItem);
