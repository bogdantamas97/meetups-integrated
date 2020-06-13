import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import { theme } from "../../globalTheme/globalTheme";
import { MainLayout } from "../../layouts/index";

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
    boxShadow: "5px 5px 5px 5px #888888",
  },
  AppRule: {
    paddingTop: "1.5vh",
    textAlign: "center",
    listStyleType: "none",
    lineHeight: 1.5,
  },
  mainGrid: {
    width: "80%",
    height: "80%",
  },
  secondaryGrid: {
    marginLeft: "5%",
  },
};

const About = (props) => (
  <MainLayout topBarTitle=" About">
    <Grid style={styles.mainGrid}>
      <Grid style={styles.secondaryGrid}>
        <Typography style={theme.typography.h6}>Rules</Typography>
      </Grid>
      <Paper style={styles.AppRuleList}>
        <ul style={styles.AppRule}>
          <li>
            <Typography style={styles.AppRule}>
              A topic can be presented if it gets minimum 5 votes
            </Typography>
          </li>
          <li>
            <Typography style={styles.AppRule}>
              Minimum 15 minutes for presentation
            </Typography>
          </li>
          <li>
            <Typography style={styles.AppRule}>
              Minimum 30 minutes for workshop
            </Typography>
          </li>
          <li>
            <Typography style={styles.AppRule}>
              Workshops are held with more than 5 people and less than 25
            </Typography>
          </li>
          <li>
            <Typography style={styles.AppRule}>
              A session every 3 weeks for presentations
            </Typography>
          </li>
          <li>
            <Typography style={styles.AppRule}>
              Workshops can be organized on a weekly basis
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

export default About;
