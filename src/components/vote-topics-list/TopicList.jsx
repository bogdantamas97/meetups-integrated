import React from "react";
import Modal from "react-animated-modal";
import {
  Button,
  Typography,
  withStyles,
  ListItem,
  List,
  MenuItem,
  TextField,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import MainLayout from "../../layouts/MainLayout.jsx";
import {
  eventType,
  TOPIC_TITLE_LIMIT,
  TOPIC_DESCRIPTION_LIMIT,
  PROPOSED_TOPICS_URL,
} from "../../constants/index";
import TopicItem from "./TopicItem.jsx";
import { EventsMessage } from "../index";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { button, theme } from "../../GlobalTheme/globalTheme.js";

const contentPlaceholder = `Ex. If it's a programming language, how new is it, what type is it (static/dynamic, interpreted/compiled). Is it good because it's performant or is it good because it's flexible?`;
const topicTypes = ["Presentation", "Workshop"];

const styles = {
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
const cookies = new Cookies();

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: [{}],
      isLoaded: false,
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
    const charLeft = TOPIC_TITLE_LIMIT - event.target.value.length;
    const topicTitle = event.target.value;
    this.setState({ charsLeftTitleBox: charLeft, topicTitle: topicTitle });
  };

  handleChangeContent = (event) => {
    const charLeft = TOPIC_DESCRIPTION_LIMIT - event.target.value.length;
    const topicContent = event.target.value;
    this.setState({ charsLeftDetailBox: charLeft, topicContent: topicContent });
  };

  handleSend = (event) => {
    if (this.check()) {
      const newTopic = {
        userId: new Cookies().get("token"),
        isUserPresenter: this.state.isChecked,
        topicType: this.state.topicType,
        topicTitle: this.state.topicTitle,
        topicContent: this.state.topicContent,
        sumOfVotes: 0,
        userVotes: [],
      };
      this.setState({
        isChecked: false,
        topicType: "Presentation",
        topicTitle: "",
        topicContent: "",
        isOpen: false,
        charsLeftTitleBox: 100,
        charsLeftDetailBox: 300,
        open: false,
      });
      event.preventDefault();
      axios
        .post(PROPOSED_TOPICS_URL, newTopic, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() =>
          axios.get(PROPOSED_TOPICS_URL).then((response) => {
            this.setState({ event: response.data });
          })
        );
    }
  };
  componentDidMount() {
    axios.get(PROPOSED_TOPICS_URL).then((res) => {
      this.setState({ event: res.data, isLoaded: true });
    });
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const styleHeader =  { display: "none", height: "10%", width: "100%" };
    const styleContent = { height: "100%", width: "100%" };

    return (
      <MainLayout topBarTitle={"Vote Topics"}>
        <div style={styleHeader}>
          <EventsMessage eventTypeMessage={eventType.voteTopics} />
        </div>
        <Modal
          visible={this.state.open}
          style={{ margin: "auto" }}
          closemodal={this.handleClose}
          type="rotateIn"
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
            <ValidatorForm ref="form" onError={(errors) => console.log(errors)}>
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
                characterlimit={TOPIC_TITLE_LIMIT}
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
                  characterlimit={TOPIC_DESCRIPTION_LIMIT}
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
                </DialogActions>
              </div>
            </ValidatorForm>
          </DialogContent>
        </Modal>
        <div style={styleContent}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.handleOpen}
          >
            <Typography
              style={{
                color: theme.palette.primary.contrastText,
                fontSize: theme.typography.subheading.fontSize,
              }}
            >
              {" "}
              Propose a topic!
            </Typography>
          </Button>
          <List className={classes.list}>
            {this.state.isLoaded
              ? this.state.event
                  .sort((a, b) => a.sumOfVotes - b.sumOfVotes)
                  .reverse()
                  .map((item) => (
                    <ListItem
                      key={item.sumOfVotes}
                      className={classes.listItem}
                    >
                      <TopicItem
                        userId={new Cookies().get("token")}
                        id={item.id}
                        title={item.topicTitle}
                        content={item.topicContent}
                        userVotes={item.userVotes}
                        sumOfVotes={item.sumOfVotes}
                      />
                    </ListItem>
                  ))
              : undefined}
          </List>
        </div>
      </MainLayout>
    );
  }
}

TopicList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicList);
