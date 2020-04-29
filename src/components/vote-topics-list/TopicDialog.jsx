import React, { Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  MenuItem,
  TextField,
  Checkbox,
  BottomNavigation,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  withStyles,
  requirePropFactory,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { button, footerBar, theme } from "../../GlobalTheme/globalTheme.js";
import Cookies from "universal-cookie/lib";

const dataBaseUrl = "http://localhost:3001/proposedTopics";
const contentPlaceholder = `Eg. If it's a programming language, how new is it, what type is it (static/dynamic, interpreted/compiled). Is it good because it's performant or is it good because it's flexible?`;
const topicTypes = ["Presentation", "Workshop"];

const styles = {
  typography: theme.typography,
  button: button,
  footerBar: footerBar,
  mainTitle: {
    fontSize: "30px",
    fontStyle: "bold",
  },
  subTitle: {
    fontStyle: "italic",
  },
  selectorLabel: {
    fontFamily: "Georgia",
    width: "50%",
    display: "flex",
    flexDirection: "row",
  },
  selectorContent: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  checkboxLabel: {
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

class TopicDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      isOpen: props.open,
      topicType: "Presentation",
      topicTitle: "",
      topicContent: "",
      charsLeftTitleBox: 100,
      charsLeftDetailBox: 300,
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
  handleSelector = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleCheckBox = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };


  handleChangeTitle = (event) => {
    const charLeft = 100 - event.target.value.length;
    const topicTitle = event.target.value;
    this.setState({ charsLeftTitleBox: charLeft, topicTitle: topicTitle });
  };

  handleChangeContent = (event) => {
    const charLeft = 300 - event.target.value.length;
    const topicContent = event.target.value;
    this.setState({ charsLeftDetailBox: charLeft, topicContent: topicContent });
  };

  handleSend = (event) => {
    if (this.check()) {
      event.preventDefault();
      axios.post(
        dataBaseUrl,
        {
          userId: new Cookies().get("token"),
          isUserPresenter: this.state.isChecked,
          topicType: this.state.topicType,
          topicTitle: this.state.topicTitle,
          topicContent: this.state.topicContent,
          sumOfVotes: 0,
          userVotes: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.setState({
        isChecked: false,
        topicType: "Presentation",
        topicTitle: "",
        topicContent: "",
        isOpen: false,
        charsLeftTitleBox: 100,
        charsLeftDetailBox: 300,
      });
    }
    this.props.handleClose("sent");
  };

  render() {
    const { classes, open, handleClose } = this.props;
    
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="topic-dialog"
        >
          <DialogTitle id="topic-dialog">
            <p className={classes.mainTitle}>Propose a topic</p>
            <p className={classes.subTitle}>
              Propose a topic that you would like to present or if you would
              like to be presented by some else.
            </p>
          </DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p className={classes.selectorLabel}>Type</p>

              <div className={classes.selectorContent}>
                <TextField
                  select
                  onChange={this.handleSelector("topicType")}
                  value={this.state.topicType}
                  margin="normal"
                >
                  {topicTypes.map((option) => (
                    <MenuItem key={option} value={option}>
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
                marginBottom: "0px",
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
              onSubmit={async () => await this.props.rerenderParentCallback()}
              onError={(errors) => console.log(errors)}
            >
              <TextValidator
                label="Topic title"
                fullWidth
                margin="normal"
                onChange={this.handleChangeTitle}
                value={this.state.topicTitle}
                inputProps={{
                  maxLength: "100",
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
                    shrink: true,
                  }}
                  multiline
                  rows="5"
                  placeholder={contentPlaceholder}
                  inputProps={{
                    maxLength: "500",
                    style: {
                      fontStyle: "italic",
                    },
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
                  <Button onClick={handleClose} color="primary">
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

TopicDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicDialog);
