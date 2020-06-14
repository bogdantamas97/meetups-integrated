import { theme } from "./globalTheme";
import { grey } from "@material-ui/core/colors";

export const headerStyles = () => ({
  summary: theme.typography.subheading,
  achiv: theme.typography.captionProfile,
  achivNext: theme.typography.caption,
  root: {
    flexGrow: 1,
  },
  spacing: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    backgroundColor: grey[100],
    "&:hover": {
      backgroundColor: grey[500],
    },
  },
});


export const profileStyles = () => ({
  typography: theme.typography.body1,
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  List: {
    marginTop: "30px",
    width: "100%",
    height: "40%",
    overflowY: "scroll",
  },
  loadmore: {
    height: "20%",
    marginTop: 40,
  },
  button: {
    textTransform: "none",
    margin: "auto",
    width: "100%",
  },
});
