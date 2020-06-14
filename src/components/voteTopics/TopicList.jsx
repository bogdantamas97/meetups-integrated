import React from "react";
import Modal from "react-animated-modal";
import {
  Button,
  Typography,
  withStyles,
  ListItem,
  List,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { topicStyles } from "../../styles";

import { MainLayout } from "../../layouts/index";
import {
  EVENT_TYPE,
  CONTENT_PLACEHOLDER,
  TOPIC_TYPES,
  TOPIC_DURATIONS,
  PROGRAMMING_LANGUAGES,
  DIFFICULTY_TYPES,
  TOPIC_TITLE_LIMIT,
  TOPIC_DESCRIPTION_LIMIT,
  PROPOSED_TOPICS_URL,
  EVENTS_URL,
  CURRENT_USER_ID,
} from "../../constants/index";
import TopicItem from "./TopicItem.jsx";
import { NewEvent, TopicDatePicker, Selector } from "../../utils";
import { getDateFormat } from "../../helpers";
import { EventsMessage } from "../index";
import { theme } from "../../styles/globalTheme";

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: [{}],
      isLoaded: false,
      isChecked: false,
      topicType: "Presentation",
      topicTitle: "",
      topicContent: "",
      topicDate: new Date(),
      topicDuration: "1h",
      programmingLanguage: "JS",
      difficultyType: "Begginner",
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

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleChange = (name) => (event) => {
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
    const isTheFormValid = this.check();

    if (isTheFormValid) {
      const newTopic = {
        userId: CURRENT_USER_ID,
        isUserPresenter: this.state.isChecked,
        topicType: this.state.topicType,
        topicTitle: this.state.topicTitle,
        topicDate: getDateFormat(this.state.topicDate),
        topicContent: this.state.topicContent,
        topicDuration: this.state.topicDuration,
        difficultyType: this.state.difficultyType,
        programmingLanguage: this.state.programmingLanguage,
        timeStamp: this.state.topicDate.getTime(),
        sumOfVotes: 0,
        userVotes: [],
      };

      this.setState({
        isChecked: false,
        topicType: "Presentation",
        topicTitle: "",
        topicContent: "",
        topicDate: new Date(),
        programmingLanguage: "JS",
        topicDuration: "1h",
        difficultyType: "Begginner",
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
      const validTopics = res.data.filter((item) => {
        if (item.timeStamp < new Date().getTime()) {
          axios.delete(`${PROPOSED_TOPICS_URL}/${item.id}`);
        } else {
          if (item.sumOfVotes >= 10) {
            axios.delete(`${PROPOSED_TOPICS_URL}/${item.id}`);
            const newEvent = new NewEvent(item);
            axios.get(EVENTS_URL).then((result) => {
              const { data } = result;
              newEvent.id = data.length + 1;
              axios.post(EVENTS_URL, newEvent);
            });
          }
        }
        return item;
      });
      this.setState({ event: validTopics, isLoaded: true });
    });
  }

  render() {
    const { classes } = this.props;

    const styleHeader = { display: "none", height: "10%", width: "100%" };
    const styleContent = { height: "100%", width: "100%" };

    return (
      <div>
        <Modal
          visible={this.state.open}
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
            <div className={classes.row}>
              <p className={classes.label}>Will you present this?</p>
              <div className={classes.checkboxContent}>
                <Checkbox
                  checked={this.state.isChecked}
                  onChange={this.handleCheckBox("isChecked")}
                  value="isChecked"
                  color="primary"
                />
              </div>
            </div>
            <Selector
              label="Type"
              handleChange={this.handleChange("topicType")}
              currentValue={this.state.topicType}
              optionsArray={TOPIC_TYPES}
            />
            <Selector
              label="Difficulty"
              handleChange={this.handleChange("difficultyType")}
              currentValue={this.state.difficultyType}
              optionsArray={DIFFICULTY_TYPES}
            />

            <div className={classes.row}>
              <p className={classes.label}>Date</p>
              <TopicDatePicker
                topicDate={this.state.topicDate}
                handleChangeDate={(date) => this.setState({ topicDate: date })}
                className={classes.defaultContent}
              />
            </div>
            <Selector
              label="Duration"
              handleChange={this.handleChange("topicDuration")}
              currentValue={this.state.topicDuration}
              optionsArray={TOPIC_DURATIONS}
            />
            <Selector
              label="Programming Language"
              handleChange={this.handleChange("programmingLanguage")}
              currentValue={this.state.programmingLanguage}
              optionsArray={PROGRAMMING_LANGUAGES}
            />
            <ValidatorForm
              ref="form"
              onSubmit={() => console.log("")}
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
                characterlimit={TOPIC_TITLE_LIMIT}
                validators={["required"]}
                errorMessages={["This field is required"]}
                helperText={this.state.charsLeftTitleBox + " characters left"}
              />

              <div>
                <TextValidator
                  label="Topic details"
                  fullWidth
                  onChange={this.handleChangeContent}
                  value={this.state.topicContent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows="5"
                  placeholder={CONTENT_PLACEHOLDER}
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
        <MainLayout topBarTitle={"Vote Topics"}>
          <div style={styleHeader}>
            <EventsMessage eventTypeMessage={EVENT_TYPE.VOTE_TOPICS} />
          </div>
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
                          userId={CURRENT_USER_ID}
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
      </div>
    );
  }
}

TopicList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(topicStyles)(TopicList);
