import { theme } from "./globalTheme";

export const baseHeaderStyles = () => ({
  topBar: {
    flexGrow: 1,
    border: "3px double rgba(30,111,164,0.6)",
    borderRadius: "15px",
  },
  avatar: {
    width: "50px",
    height: "50px",
  },
});

export const contentStyles = () => ({
  content: {
    backgroundColor: theme.palette.secondary.light,
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

export const footerBarStyles = () => ({
  paper: {
    backgroundColor: "#22306F ",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    border: "3px double rgba(30,111,164,0.6)",
    borderRadius: "5px 5px 0px 0px",
  },
});

