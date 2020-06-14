import { blue, grey } from "@material-ui/core/colors";
import { theme } from "./globalTheme";

export const eventDialogStyles = () => ({
  typography: theme.typography,
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogButton: {
    color: blue[300],
    borderTop: `1px solid lightgray`,
    margin: "auto",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: grey[300],
    },
  },
  highlightedWord: {
    color: "blue",
  },
  title: {
    margin: "auto",
  },
});

export const futureEventItemStyles = () => ({
  container: {
    width: "100%",
    height: "100%",
  },
  itemOne: {
    width: 65,
  },
  itemThree: {
    width: 105,
  },
  itemMiddle: {
    height: 15,
  },
  itemBottom: {
    height: 9,
    marginTop: 5,
  },
  hoverButton: {
    "&:hover": {
      color: blue[100],
    },
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: "5%",
    marginTop: 10,
  },
  typography: {
    fontWeight: "bold",
  },
  timeFrame: {
    width: 80,
    height: 50,
    borderStyle: "solid",
    border: 1,
    borderRadius: 20,
    borderColor: "#10cfcf",
    marginRight: "5%",
    marginTop: "10%",
  },
  typographyThreeTop: {
    marginLeft: 6,
    marginTop: 10,
  },
  typographyThreeBottom: {
    marginLeft: 20,
    marginTop: -6,
  },
});

export const futureEventsStyles = () => ({
  root: {
    width: "100%",
    height: "100%",
  },
  header: {
    display: "block",
    height: "30%",
    width: "100%",
  },
  styleHeader: {
    display: "block",
    height: "15%",
    width: "100%",
    maxHeight: 90,
  },
  styleContent: { height: "85%", width: "100%" },
  list: {
    height: "98%",
    width: "100%",
  },
  listItem: {
    width: "100%",
    height: 73,
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
});
