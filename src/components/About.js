import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Paper, Typography } from "@material-ui/core";
import { theme } from "../GlobalTheme/globalTheme";
import Grid from "@material-ui/core/Grid";

const styles = {
  AppRuleList: {
    height: "60vh",
    maxHeight: "70%",
    width: "85%",
    marginTop: "3vh",
    paddingTop: "3vh",
    paddingBottom: "3vh",
    marginLeft: "5%",
    paddingRight: "5%",
    marginRight: "5%",
    boxShadow: "5px 5px 5px 5px #888888"
  },
  AppRule: {
    lineHeight: 1.5
  }
};
export default class About extends React.Component {
  render() {
    return (
      <MainLayout topBarTitle=" About">
        <Grid style={{ width: "100%", height: "100%" }}>
          <div style={{ height: "2vh" }} />
          <Grid style={{ marginLeft: "5%" }}>
            <Typography style={theme.typography.h6}>Rules</Typography>
          </Grid>
          <Paper style={styles.AppRuleList}>
            <ul style={styles.AppRule}>
              <li>
                <Typography style={styles.AppRule}>
                  A topic can be presented if it gets minimum 10 votes
                </Typography>
              </li>
              <li>
                <Typography style={styles.AppRule}>
                  minimum 15 minutes for presentation
                </Typography>
              </li>
              <li>
                <Typography style={styles.AppRule}>
                  minimum 45 minutes for workshop
                </Typography>
              </li>
              <li>
                <Typography style={styles.AppRule}>
                  workshops are held with 5 to 12 peps
                </Typography>
              </li>
              <li>
                <Typography style={styles.AppRule}>
                  1 session every 3 weeks for presentations
                </Typography>
              </li>
              <li>
                <Typography style={styles.AppRule}>
                  workshops can be organized on a weekly basis
                </Typography>
              </li>
              <li>
                <Typography style={styles.AppRule}>
                  Same presentation can be held after 6 months
                </Typography>
              </li>
            </ul>
          </Paper>
        </Grid>
      </MainLayout>
    );
  }
}
