import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { Typography, Paper } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { button, footerBar, theme } from "../GlobalTheme/globalTheme.js";
import Cookies from "universal-cookie/lib";

const dataBaseUrl = "http://localhost:3001/proposedTopics";
const contentPlaceholder = `Eg. If it's a programming language, how new is it, what type is it (static/dynamic, interpreted/compiled). Is it good because it's performant or is it good because it's flexible?`;
const topicTypes = ["Presentation", "Workshop"];

const styles = {
  typography: theme.typography,
  button: button,
  footerBar: footerBar,

  mainTitle: {
    fontSize: "5vmin",
    margin: "0"
  },
  subTitle: {
    fontSize: "2.8vmin"
  },
  selectorLabel: {
    fontFamily: "Times",
    fontSize: "4vmin",
    width: "50%",
    display: "flex",
    flexDirection: "row"
  },
  selectorContent: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  checkboxLabel: {
    fontFamily: "Times",
    fontSize: "4vmin",
    width: "80%",
    display: "flex",
    flexDirection: "row"
  },
  checkboxContent: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    fontSize: "3.2vmin",
    justifyContent: "flex-end"
  },
  detailsTitle: {
    fontFamily: "Times",
    fontSize: "3vmin"
  }
};

class FooterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
      isChecked: false,
      isOpen: false,
      topicType: "Presentation",
      topicTitle: "",
      topicContent: "",
      charsLeftTitleBox: 100,
      charsLeftDetailBox: 500
    };
  }

  check = () => {
    if (
      this.state.topicContent === "" ||
      this.state.topicContent.title === ""
    ) {
      return false;
    }

    return true;
  };
  handleSelector = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleCheckBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChangeTitle = event => {
    const charLeft = 100 - event.target.value.length;
    const topicTitle = event.target.value;
    this.setState({ charsLeftTitleBox: charLeft, topicTitle: topicTitle });
  };

  handleChangeContent = event => {
    const charLeft = 500 - event.target.value.length;
    const topicContent = event.target.value;
    this.setState({ charsLeftDetailBox: charLeft, topicContent: topicContent });
  };

  handleSend = event => {
    if (this.check()) {
      event.preventDefault();
      axios.post(
        dataBaseUrl,
        {
          usersId: this.state.currentUser,
          isUserPresenter: this.state.isChecked,
          topicType: this.state.topicType,
          topicTitle: this.state.topicTitle,
          topicContent: this.state.topicContent,
          sumOfVotes: 0,
          userVotes: []
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      this.setState({
        isChecked: false,
        topicType: "Presentation",
        topicTitle: "",
        topicContent: "",
        isOpen: false,
        charsLeftTitleBox: 100,
        charsLeftDetailBox: 500
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper style={{ height: "100%" }}>
          <BottomNavigation className={classes.footerBar}>
            {new Cookies().get("token") && (
              <Button
                style={{ margin: "0px" }}
                variant="contained"
                className={classes.button}
                onClick={this.handleOpen}
              >
                <Typography
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontSize: theme.typography.subheading.fontSize
                  }}
                >
                  {" "}
                  Propose a topic!
                </Typography>
              </Button>
            )}
          </BottomNavigation>
        </Paper>

        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="topic-dialog"
        >
          <DialogTitle id="topic-dialog">
            <p className={classes.mainTitle}>Propose a topic</p>
          </DialogTitle>

          <DialogContent>
            <p className={classes.subTitle}>
              Propose a topic that you would like to present or if you would
              like to be presented by some else.
            </p>

            <div style={{ display: "flex", alignItems: "center" }}>
              <p className={classes.selectorLabel}>Type</p>

              <div className={classes.selectorContent}>
                <TextField
                  select
                  onChange={this.handleSelector("topicType")}
                  value={this.state.topicType}
                  InputProps={{
                    style: {
                      fontFamily: "Georgia",
                      fontSize: "3.5vmin"
                    }
                  }}
                  margin="normal"
                >
                  {topicTypes.map(option => (
                    <MenuItem
                      key={option}
                      value={option}
                      style={{ fontSize: "4vmin" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                  >
                </TextField>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0px"
              }}
            >
              <p className={classes.checkboxLabel}>You want to present this?</p>
              <div className={classes.checkboxContent}>
                <Checkbox
                  checked={this.state.isChecked}
                  onChange={this.handleCheckBox("isChecked")}
                  value="isChecked"
                  color="primary"
                />
              </div>
            </div>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSend}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                label="Topic title"
                fullWidth
                margin="normal"
                onChange={this.handleChangeTitle}
                value={this.state.topicTitle}
                inputProps={{
                  maxLength: "100",
                  style: {
                    fontSize: "3.6vmin"
                  }
                }}
                multiline
                characterlimit={100}
                validators={["required"]}
                errorMessages={["This field is required"]}
                helperText={this.state.charsLeftTitleBox + " characters left"}
              />

              <div>
                <p className={classes.detailsTitle}>
                  Add here some more details about the topic, why is this topic
                  important?
                </p>

                <TextValidator
                  label="Details"
                  fullWidth
                  onChange={this.handleChangeContent}
                  value={this.state.topicContent}
                  InputLabelProps={{
                    shrink: true
                  }}
                  multiline
                  rows="5"
                  placeholder={contentPlaceholder}
                  inputProps={{
                    maxLength: "500",
                    style: {
                      fontStyle: "italic"
                    }
                  }}
                  characterlimit={500}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  helperText={
                    this.state.charsLeftDetailBox + " characters left"
                  }
                />
                <DialogActions>
                  <Button
                    type="submit"
                    onClick={this.handleSend}
                    color="primary"
                  >
                    Send
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </div>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FooterBar);
