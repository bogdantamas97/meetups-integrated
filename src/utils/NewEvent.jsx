const NewEvent = (props) => {
  const event = {};
  event.name = props.topicTitle;
  event.type = props.topicType;
  event.date = props.topicDate;
  event.lang = props.programmingLanguage;
  event.duration = props.topicDuration;
  event.difficulty = props.difficultyType;
  event.timestamp = props.timeStamp;
  event.attendanceIds = [];
  event.waitingListIds = [];
  event.feedback = [];

  if (props.isUserPresenter) event.userId = props.userId;

  return event;
};

export default NewEvent;
