import React from "react";
import PropTypes from "prop-types";

import { theme } from "../../GlobalTheme/globalTheme";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";

const styles = {
  paper: {
    width: "100%",
    height: "100%",
    marginTop: "10px",
  },
  grid: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
  itemOne: {
    width: "80%",
    paddingLeft: "20px",
  },
  itemTwo: {
    width: "20%",
  },
};

const ListComponent = (props) => {
  const { classes } = props;

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
              {props.name}
            </Typography>
          </Grid>
          <Grid item className={classes.itemTwo}>
            <Typography style={{ color: theme.palette.primary.light }}>
              {props.points}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

ListComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
};

ListComponent.defaultProps = {
  id: "",
  name: "Username",
  points: "",
};

export default withStyles(styles)(ListComponent);
