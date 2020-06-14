import { theme } from "./globalTheme";
import { button } from "./index";

export const topicItemStyles = {
  container: {
    width: "100%",
    height: "100%",
  },
  itemOne: {
    width: 65,
  },
  itemThree: {
    width: 105,
    alignItems: "center",
  },
  itemTop: {
    height: "35%",
  },
  itemBottom: {
    height: "65%",
    marginBottom: "2px",
  },
  itemTopTypography: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    padding: "5px",
  },
  itemBottomTypography: {
    fontSize: 12,
    color: "gray",
    padding: "5px",
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
  arrowup: {
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "20px solid",
    paddingBottom: "10px",
  },
  arrowdown: {
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderTop: "20px solid",
    margin: "5px",
  },
};

export const topicStyles = {
  typography: theme.typography,
  button: button,
  root: {
    width: "100%",
    height: "100%",
  },
  header: {
    display: "block",
    height: "30%",
    width: "100%",
    backgroundColor: "white",
  },
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
  mainTitle: {
    fontSize: "20px",
    fontStyle: "bold",
    marginBottom: "auto",
  },
  subTitle: {
    fontSize: "15px",
    fontStyle: "italic",
    marginBottom: "auto",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "auto",
  },
  defaultContent: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  label: {
    fontFamily: "Georgia",
    width: "80%",
    display: "flex",
    flexDirection: "row",
  },
  checkboxContent: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  detailsTitle: {
    fontFamily: "Arial",
  },
};
