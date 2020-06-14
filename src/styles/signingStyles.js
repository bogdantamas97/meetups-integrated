import { red, green } from "@material-ui/core/colors";

export const registerPageStyles = {
  formStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "100%",
    width: "100%",
    paddingBottom: "15vh",
    paddingTop: "15vh",
  },
  inputField: {
    color: "white",
    height: "50%",
    marginTop: 5,
    marginBottom: 5,
    width: "60%",
    maxWidth: 400,
    borderRadius: 5,
    paddingLeft: 4,
    paddingBottom: 5,
  },
  clearButton: {
    color: "#fff",
    fontStyle: "normal",
    textTransform: "none",
    fontWeight: "normal",
    height: 35,
    width: "100%",
    maxWidth: 300,
    margin: "12px 0px",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[900],
    },
  },
  inputText: {
    color: "white",
    height: "50%",
  },
  cssLabel: {
    color: "white",
    "&$cssFocused": {
      color: "white",
    },
  },
  cssFocused: {
    color: "white",
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "white !important",
  },
  arrowBackIcon: {
    color: "white",
    width: 80,
    height: 50,
    "&:hover": {
      backgroundColor: "gray",
    },
  },
};

export const loginPageStyles = {
  loginButton: {
    color: "#fff",
    fontStyle: "normal",
    textTransform: "none",
    fontWeight: "normal",
    height: 50,
    width: "100%",
    margin: "12px 0px",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[900],
    },
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    height: 250,
    width: "50%",
    marginTop: "30%",
  },
  input: {
    color: "white",
    height: "50%",
  },
  emailInput: {
    display: "flex",
    flexWrap: "wrap",
    color: "white",
  },
  cssLabel: {
    color: "white",
    "&$cssFocused": {
      color: "white",
    },
  },
  cssFocused: {
    color: "white",
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "white",
    },
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "white !important",
  },
  signUp: {
    color: "white",
    "&:hover": {
      backgroundColor: "gray",
    },
  },
};
