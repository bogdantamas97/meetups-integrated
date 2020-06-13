import { createMuiTheme } from "@material-ui/core/styles";
import { background } from "../images/index";
import { green } from "@material-ui/core/colors";

const palette = {
  primary: {
    main: "#001e3d",
    light: "#334b63",
    dark: "#00152a",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#fbfff7",
    light: "#fbfff8",
    dark: "#afb2ac",
    contrastText: "#000000",
  },
};
const typography = {
  useNextGen: true,
  headline: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "21px",
    fontSize: "24px",
    fontWeight: 400,
  },
  display2: {
    marginLeft: "-0.32px",
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "18px",
    fontSize: "45px",
    fontWeight: 400,
  },
  fontWeightLight: 300,
  display3: {
    marginLeft: "-0.32px",
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    letterSpacing: "-0.32px",
    lineHeight: "21px",
    fontSize: "56px",
    fontWeight: 400,
  },
  display4: {
    marginLeft: "-0.64px",
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    letterSpacing: "-0.64px",
    lineHeight: "18px",
    fontSize: "112px",
    fontWeight: 400,
  },
  fontWeightRegular: 400,
  display1: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "19px",
    fontSize: "34px",
    fontWeight: 400,
  },
  button: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    fontSize: "14px",
    fontWeight: 500,
  },
  fontFamily: "Lato / sans-serif",
  body2: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "27px",
    fontSize: "14px",
    fontWeight: 500,
  },
  caption: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "22px",
    fontSize: "14px",
    fontWeight: 400,
  },
  captionProfile: {
    color: "steelblue",
    fontFamily: "Lato / sans-serif",
    lineHeight: "22px",
    fontSize: "20px",
    fontWeight: 700,
  },
  fontSize: 14,
  fontWeightMedium: 500,
  title: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "18px",
    fontSize: "21px",
    fontWeight: 500,
  },
  subheading: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "24px",
    fontSize: "16px",
    fontWeight: 400,
  },
  heading: {
    color: "#000000",
    fontFamily: "Lato / sans-serif",
    lineHeight: "24px",
    fontSize: "34px",
    fontWeight: 900,
  },
  body1: {
    color: palette.primary.light,
    fontFamily: "Lato / sans-serif",
    fontSize: "14px",
    fontWeight: "400",
  },
  difficultyFont: {
    color: "#ffffff",
    fontFamily: "Lato / sans-serif",
    fontSize: "12px",
    fontWeight: 400,
  },
};

export const button = {
  color: "#fff",
  fontStyle: "normal",
  textTransform: "none",
  fontWeight: "normal",
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[900],
  },
  display: "flex",
  flexDirection: "column",
  margin: "auto",
};

export const eventTitle = {
  fontFamily: "Lato / sans-serif",
  fontWeight: "bold",
  color: "#596676",
};

export const eventSubtitle = {
  fontFamily: "Lato / sans-serif",
  fontSize: "3.5vw",
  fontWeight: 600,
  color: "#b8bdc4",
};

export const eventBottom = {
  fontFamily: "Lato / sans-serif",
  fontSize: "3vw",
  fontWeight: 500,
  color: "#1252ba",
};

export const difficultyBar = {
  backgroundColor: "#323232",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  height: "100%",
  padding: "0px 4px",
};

export const Background = {
  background: `url(${background}) no-repeat`,
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
export const theme = createMuiTheme({ palette, typography, background });
