import { theme } from "./globalTheme";

export const leaderboardItemStyles = () => ({
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
});

export const leaderboardStyles = () => ({
  root: {
    height: "100%",
    width: "100%",
  },
  header: {
    height: "30%",
    width: "100%",
  },
  content: {
    height: "70%",
    width: "100%",
  },
  image: {
    height: "90%",
    width: "50%",
    marginLeft: "25%",
  },
  List: {
    width: "100%",
    height: "60%",
    overflowY: "scroll",
  },
  ListItem: {
    height: "20%",
  },
  typography: theme.typography.body1,
  loadMore: {
    height: "20%",
    width: "100%",
    marginTop: 40,
  },
  button: {
    textTransform: "none",
    width: "30%",
    marginLeft: "35%",
  },
});
