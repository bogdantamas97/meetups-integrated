import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import { theme } from "../../styles/globalTheme";
import { aboutStyles } from '../../styles';
import { MainLayout } from "../../layouts/index";

const About = () => (
  <MainLayout topBarTitle=" About">
    <Grid style={aboutStyles.mainGrid}>
      <Grid style={aboutStyles.secondaryGrid}>
        <Typography style={theme.typography.h6}>Rules</Typography>
      </Grid>
      <Paper style={aboutStyles.AppRuleList}>
        <ul style={aboutStyles.AppRule}>
          <li>
            <Typography style={aboutStyles.AppRule}>
              A topic can be presented if it gets minimum 5 votes
            </Typography>
          </li>
          <li>
            <Typography style={aboutStyles.AppRule}>
              Minimum 15 minutes for presentation
            </Typography>
          </li>
          <li>
            <Typography style={aboutStyles.AppRule}>
              Minimum 30 minutes for workshop
            </Typography>
          </li>
          <li>
            <Typography style={aboutStyles.AppRule}>
              Workshops are held with more than 5 people and less than 25
            </Typography>
          </li>
          <li>
            <Typography style={aboutStyles.AppRule}>
              A session every 3 weeks for presentations
            </Typography>
          </li>
          <li>
            <Typography style={aboutStyles.AppRule}>
              Workshops can be organized on a weekly basis
            </Typography>
          </li>
          <li>
            <Typography style={aboutStyles.AppRule}>
              Same presentation can be held after 6 months
            </Typography>
          </li>
        </ul>
      </Paper>
    </Grid>
  </MainLayout>
);

export default About;
