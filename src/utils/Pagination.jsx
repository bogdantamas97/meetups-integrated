import React from "react";
import { ListItem, Typography, Paper } from "@material-ui/core";

import LeaderboardItem from "../components/leaderboard/LeaderboardItem";
import { theme } from "../styles/globalTheme";

export const Pagination = (points, elementsToShow) => {
  return points !== undefined ? (
    points
      .filter((item) => points.indexOf(item) < elementsToShow)
      .map((item) => (
        <ListItem key={item.id}>
          <LeaderboardItem
            name={`+${item.value} ${item.type}`}
            points={item.date}
          />
        </ListItem>
      ))
  ) : (
    <Paper
      style={{
        display: "flex",
        marginTop: "10%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "80%",
        height: "30%",
        marginLeft: "10%",
        textAlign: "center",
      }}
    >
      <Typography style={theme.typography.title}>
        You have no recent history.
      </Typography>
    </Paper>
  );
};
